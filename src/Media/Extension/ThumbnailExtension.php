<?php declare(strict_types=1);

namespace Shopware\Media\Extension;

use Shopware\Api\Entity\EntityExtensionInterface;
use Shopware\Api\Entity\Field\StructCollectionField;
use Shopware\Api\Entity\FieldCollection;
use Shopware\Api\Entity\Write\Flag\Deferred;
use Shopware\Api\Entity\Write\Flag\Extension;
use Shopware\Api\Entity\Write\Flag\ReadOnly;
use Shopware\Api\Media\Definition\MediaDefinition;
use Shopware\Api\Media\Event\Media\MediaBasicLoadedEvent;
use Shopware\Api\Media\Struct\MediaBasicStruct;
use Shopware\Framework\Struct\StructCollection;
use Shopware\Media\Struct\ThumbnailStruct;
use Shopware\Media\UrlGeneratorInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ThumbnailExtension implements EntityExtensionInterface, EventSubscriberInterface
{
    /**
     * @var UrlGeneratorInterface
     */
    private $urlGenerator;

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
    }

    public function extendFields(FieldCollection $collection)
    {
        $collection->add(
            (new StructCollectionField('thumbnails', ThumbnailStruct::class, true))->setFlags(new Extension(), new Deferred(), new ReadOnly())
        );
    }

    public function getDefinitionClass(): string
    {
        return MediaDefinition::class;
    }

    public static function getSubscribedEvents()
    {
        return [
            MediaBasicLoadedEvent::NAME => 'mediaBasicLoaded',
        ];
    }

    public function mediaBasicLoaded(MediaBasicLoadedEvent $event): void
    {
        foreach ($event->getMedia() as $media) {
            $this->addThumbnails($media);
        }
    }

    public function createThumbnailStruct(string $filename, int $width, int $height, bool $isHighDpi = false): ThumbnailStruct
    {
        $pathinfo = pathinfo($filename);
        $basename = $pathinfo['filename'];
        $extension = $pathinfo['extension'];

        $filename = $basename . '_' . $width . 'x' . $height;

        if ($isHighDpi) {
            $filename .= '@2x';
        }

        $thumbnail = new ThumbnailStruct();
        $thumbnail->setFileName($filename . '.' . $extension);
        $thumbnail->setWidth($width);
        $thumbnail->setHeight($height);
        $thumbnail->setHighDpi($isHighDpi);
        $thumbnail->setUrl(
            $this->urlGenerator->getUrl($thumbnail->getFileName())
        );

        return $thumbnail;
    }

    private function addThumbnails(MediaBasicStruct $media): void
    {
        if ($media->getAlbum()->getCreateThumbnails() === false) {
            return;
        }

        $thumbnailSizes = explode(';', $media->getAlbum()->getThumbnailSize());

        $collection = new StructCollection();

        foreach ($thumbnailSizes as $size) {
            list($width, $height) = explode('x', $size);

            $width = (int) $width;
            $height = (int) $height;

            $collection->add(
                $this->createThumbnailStruct($media->getFileName(), $width, $height)
            );

            if ($media->getAlbum()->getThumbnailHighDpi()) {
                $collection->add(
                    $this->createThumbnailStruct($media->getFileName(), $width, $height, true)
                );
            }
        }

        $media->addExtension('thumbnails', $collection);
    }
}