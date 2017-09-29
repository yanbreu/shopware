<?php declare(strict_types=1);

namespace Shopware\Search\Writer\Resource;

use Shopware\Context\Struct\TranslationContext;
use Shopware\Framework\Write\Field\IntField;
use Shopware\Framework\Write\Flag\Required;
use Shopware\Framework\Write\WriteResource;

class SearchIndexWriteResource extends WriteResource
{
    protected const KEYWORDID_FIELD = 'keywordID';
    protected const FIELDID_FIELD = 'fieldID';
    protected const ELEMENTID_FIELD = 'elementID';

    public function __construct()
    {
        parent::__construct('s_search_index');

        $this->primaryKeyFields[self::KEYWORDID_FIELD] = (new IntField('keywordID'))->setFlags(new Required());
        $this->primaryKeyFields[self::FIELDID_FIELD] = (new IntField('fieldID'))->setFlags(new Required());
        $this->primaryKeyFields[self::ELEMENTID_FIELD] = (new IntField('elementID'))->setFlags(new Required());
    }

    public function getWriteOrder(): array
    {
        return [
            \Shopware\Search\Writer\Resource\SearchIndexWriteResource::class,
        ];
    }

    public static function createWrittenEvent(array $updates, TranslationContext $context, array $errors = []): \Shopware\Search\Event\SearchIndexWrittenEvent
    {
        $event = new \Shopware\Search\Event\SearchIndexWrittenEvent($updates[self::class] ?? [], $context, $errors);

        unset($updates[self::class]);

        if (!empty($updates[\Shopware\Search\Writer\Resource\SearchIndexWriteResource::class])) {
            $event->addEvent(\Shopware\Search\Writer\Resource\SearchIndexWriteResource::createWrittenEvent($updates, $context));
        }

        return $event;
    }
}