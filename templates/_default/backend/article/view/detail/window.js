/**
 * Shopware 4.0
 * Copyright © 2012 shopware AG
 *
 * According to our dual licensing model, this program can be used either
 * under the terms of the GNU Affero General Public License, version 3,
 * or under a proprietary license.
 *
 * The texts of the GNU Affero General Public License with an additional
 * permission and of our proprietary license can be found at and
 * in the LICENSE file you have received along with this program.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * "Shopware" is a registered trademark of shopware AG.
 * The licensing of the program under the AGPLv3 does not imply a
 * trademark license. Therefore any rights, title and interest in
 * our trademarks remain entirely with us.
 *
 * @category   Shopware
 * @package    Article
 * @subpackage Detail
 * @copyright  Copyright (c) 2012, shopware AG (http://www.shopware.de)
 * @version    $Id$
 * @author shopware AG
 */

/**
 * Shopware UI - Article detail window.
 * The detail window contains the definition of the base form and the element orientation within the form element.
 * The window passes the article record and the different stores to the form elements.
 *
 * shopware AG (c) 2012. All rights reserved.
 *
 * @link http://www.shopware.de/
 * @date 2012-02-20
 * @license http://www.shopware.de/license
 * @package Article
 * @subpackage Detail
 */
//{namespace name=backend/article/view/main}
//{block name="backend/article/view/detail/window"}
Ext.override(Ext.container.DockingContainer, {
    dockedItems: []
});
Ext.define('Shopware.apps.Article.view.detail.Window', {
    /**
     * Define that the order main window is an extension of the enlight application window
     * @string
     */
    extend:'Enlight.app.Window',
    /**
     * Set base css class prefix and module individual css class for css styling
     * @string
     */
    cls:Ext.baseCSSPrefix + 'article-detail-window',
    /**
     * List of short aliases for class names. Most useful for defining xtypes for widgets.
     * @string
     */
    alias:'widget.article-detail-window',
    /**
     * Set no border for the window
     * @boolean
     */
    border:false,
    /**
     * True to automatically show the component upon creation.
     * @boolean
     */
    autoShow:true,
    /**
     * Set border layout for the window
     * @string
     */
    layout:'fit',
    /**
     * Define window width
     * @integer
     */
    width:'80%',
    /**
     * Define window height
     * @integer
     */
    height:'90%',
    /**
     * True to display the 'maximize' tool button and allow the user to maximize the window, false to hide the button and disallow maximizing the window.
     * @boolean
     */
    maximizable:true,

    /**
     * True to display the 'minimize' tool button and allow the user to minimize the window, false to hide the button and disallow minimizing the window.
     * @boolean
     */
    minimizable:true,

    /**
     * A flag which causes the object to attempt to restore the state of internal properties from a saved state on startup.
     */
    stateful:false,

    /**
     * The unique id for this object to use for state management purposes.
     */
    stateId:'shopware-article-detail-window',

    /**
     * Contains all snippets for the component
     * @object
     */
    snippets: {
        titleGeneral: '{s name=window_title_general}Product details{/s}',
        titleNew: '{s name=window_title}Article details: new article{/s}',
        titleEdit:'{s name=window_title_edit}Article details : [0]{/s}',
        formTab:'{s name=base_data}Base data{/s}',
        categoryTab:'{s name=category_data}Categories{/s}',
        imageTab:'{s name=image_tab}Images{/s}',
        propertyTab:'{s name=property_tab}Properties{/s}',
        variantTab:'{s name=variant_tab}Variants{/s}',
        configuratorTab:'{s name=configurator_tab}Configurator{/s}',
        linkTab:'{s name=link_tab}Links{/s}',
        downloadTab:'{s name=download_tab}Downloads{/s}',
        crossSellingTab:'{s name=cross_selling_tab}Cross-Selling{/s}',
        esdTab:'{s name=esd_tab}ESD{/s}',
        statisticTab:'{s name=statistic_tab}Statistics{/s}',
        save:'{s name=save_button}Save article{/s}',
        cancel:'{s name=cancel_button}Cancel{/s}',
        categoryNotice:'{s name=category/category_notice}Please select the category to which the product <strong>[0]</strong> is supposed to be assigned.{/s}',
        categoryNoticeTitle:'{s name=category/category_assignment}Assign categories{/s}',
        invalidPlugin: '{s name=window_invalid_plugin}The plugin [0] is not compatible with Shopware 4.1. Please uninstall the plugin or contact the provider regarding for a compatible version.{/s}',
        descriptions: {
            title:'{s name=detail/description/title}Description{/s}',
            description: {
                label: '{s name=detail/description/description_label}Short description{/s}',
                support: '{s name=detail/description/description_support}Short description for search engines, exports and overviews{/s}'
            },
            keywords: {
                label: '{s name=detail/description/keywords_label}Keywords{/s}',
                support: '{s name=detail/description/keywords_support}Meta keywords for search engines and intelligent search{/s}'
            }
        },
        additional: {
            title:'{s name=detail/additional_fields/title}Additional fields{/s}',
            comment:'{s name=detail/additional_fields/comment}Comment{/s}',
            attribute1:'{s name=detail/additional_fields/free_text_1}Free text 1{/s}',
            attribute2:'{s name=detail/additional_fields/free_text_2}Free text 2{/s}'
        },
        basePrice: {
            title:'{s name=detail/base_price/title}Base price calculation{/s}',
            content:'{s name=detail/base_price/content}Content{/s}',
            unit:'{s name=detail/base_price/unit}Unit{/s}',
            basicUnit:'{s name=detail/base_price/basic_unit}Basic unit{/s}',
            packingUnit:'{s name=detail/base_price/packing_unit}Packing unit{/s}',
            empty:'{s name=empty}Please select...{/s}'
        },
        variant: {
            listing: '{s name=variant/listing_tab}Listing{/s}',
            configurator: '{s name=variant/configurator_tab}Configure variants{/s}',
            settings: '{s name=variant/settings_tab}Settings{/s}',
            button: {
                listing: '{s name=variant/save_button_listing}Save variants{/s}',
                settings: '{s name=variant/save_button_settings}Save settings{/s}',
                configurator: '{s name=variant/save_button_configurator}Generate variants{/s}'
            }
        },
        esd: {
            button: {
                save: '{s name=esd/save_button}Save ESD{/s}',
                back: '{s name=esd/back_button}Back to overview{/s}'
            }
        },
        variantTabTooltip: "{s name=variant_tab/tooltip}Functionality isn't available in the split view mode.{/s}"
    },

    /**
     * The initComponent template method is an important initialization step for a Component.
     * It is intended to be implemented by each subclass of Ext.Component to provide any needed constructor logic.
     * The initComponent method of the class being created is called first,
     * with each initComponent method up the hierarchy to Ext.Component being called thereafter.
     * This makes it easy to implement and, if needed, override the constructor logic of the Component at any step in the hierarchy.
     * The initComponent method must contain a call to callParent in order to ensure that the parent class' initComponent method is also called.
     *
     * @return void
     */
    initComponent:function () {
        var me = this;
        me.bbar = me.createToolbar();
        me.registerEvents();
        me.callParent(arguments);
        me.changeTitle();

        // A incompatible plugin was found, throw a alert to inform the user.
        if(me._invalidPlugin) {
            Ext.MessageBox.alert(me.snippets.titleGeneral, Ext.String.format(me.snippets.invalidPlugin, '"' + me['_invalidClassName'] + '"'));
        }

        me.on('storesLoaded', me.onStoresLoaded, me);
    },

    /**
     * Registers additional component events.
     */
    registerEvents: function() {
        this.addEvents(
            /**
             * Event will be fired when the user clicks the save button.
             *
             * @event
             * @param [object] The detail window
             * @param [Ext.data.Model] The article record.
             */
            'saveArticle',
            /**
             * Event will be fired when the user clicks the cancel button.
             *
             * @event
             * @param [object] The detail window
             */
            'cancel',

            'storesLoaded'
        );
    },

    /**
     * Creates the main tab panel which displays the different tabs for the article sections.
     * To extend the tab panel this function can be override.
     *
     * @return Ext.tab.Panel
     */
    createMainTabPanel: function() {
        var me = this, tooltip = '';


        if (me.subApp.splitViewActive) {
            tooltip = me.snippets.variantTabTooltip;
        }

        me.categoryTab = Ext.create('Ext.container.Container', {
            title: me.snippets.categoryTab,
            disabled: true,
            layout: 'border',
            name: 'category'
        });

        me.imageTab = Ext.create('Ext.container.Container', {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            title: me.snippets.imageTab,
            name: 'image',
            disabled: true,
            cls: Ext.baseCSSPrefix + 'image-tab-container'
        });

        me.variantTab = Ext.create('Ext.container.Container', {
            title: me.snippets.variantTab,
            disabled: true,
            tooltip: tooltip,
            layout: 'fit',
            name: 'variant-tab'
        });

        me.esdTab = Ext.create('Ext.container.Container', {
            title: me.snippets.esdTab,
            disabled: true,
            name: 'esd-tab',
            layout: 'card',
            deferredRender: true
        });

        me.statisticTab = Ext.create('Ext.container.Container', {
            title: me.snippets.statisticTab,
            disabled: true,
            name: 'statistic-tab',
            layout: {
                align: 'stretch',
                padding: 10,
                type: 'vbox'
            }
        });

        return me.mainTab = Ext.create('Ext.tab.Panel', {
            name: 'main-tab-panel',
            items: [
                me.createBaseTab(),
                me.categoryTab,
                me.imageTab,
                me.variantTab,
                me.esdTab,
                me.statisticTab
            ]
        });
    },


    /**
     * Changes the title of the article detail window header and the footer button.
     */
    changeTitle: function() {
        var me = this, title, footerButton;

        title = me.snippets.titleNew;
        if (me.article && me.article.get('id')>0) {
            title = Ext.String.format(me.snippets.titleEdit, me.article.get('name'));
        }
        me.setTitle(title);

        // Change the title of the footer button
        if(me._toolbarBtn) {
            footerButton = me._toolbarBtn;
            footerButton.setText(title);
        }
    },

    /**
     * Creates the tab panel for the base data. Contains a form panel which allows the user
     * to edit the selected record
     * @return Ext.container.Container
     */
    createBaseTab: function() {
        var me = this;

        me.detailForm = Ext.create('Ext.form.Panel', {
            region:'center',
            name: 'detail-form',
            bodyPadding: 10,
            autoScroll: true,
            defaults: {
                labelWidth: 155
            },
            plugins: [{
                ptype: 'translation',
                pluginId: 'translation',
                translationType: 'article',
                translationMerge: false,
                translationKey: null
            }],
            items: [
                me.createBaseFieldSet(),
                me.createPriceFieldSet(),
                me.createDescriptionFieldSet(),
                me.createBasePriceFieldSet(),
                me.createSettingsFieldSet(),
                me.createPropertiesFieldSet()
            ]
        });

        return me.detailContainer = Ext.create('Ext.container.Container', {
            layout: 'border',
            name: 'main',
            title: me.snippets.formTab,
            items: [
                me.detailForm,
                {
                    xtype: 'article-sidebar',
                    region: 'east',
                    article: me.article,
                    shopStore: me.shopStore
                }
            ]
        });
    },

    /**
     * Creates the field set for the article property configuration.
     */
    createPropertiesFieldSet: function() {
        return Ext.create('Shopware.apps.Article.view.detail.Properties');
    },

    /**
     * Creates the field set for the article setting configuration.
     */
    createSettingsFieldSet: function() {
        return Ext.create('Shopware.apps.Article.view.detail.Settings');
    },

    /**
     * Creates the base field set for the detail form.
     * @return Shopware.apps.Article.view.detail.Base
     */
    createBaseFieldSet: function() {
        return Ext.create('Shopware.apps.Article.view.detail.Base');
    },

    /**
     * Creates the field set for the article price configuration.
     */
    createPriceFieldSet: function() {
        var me = this;

        return Ext.create('Shopware.apps.Article.view.detail.Prices');
    },


    /**
     * Creates the field set for the article base price calculation.
     * @return Ext.form.FieldSet
     */
    createBasePriceFieldSet: function() {
        var me = this;

        me.unitComboBox = Ext.create('Ext.form.field.ComboBox', {
            name: 'mainDetail[unitId]',
            queryMode: 'local',
            fieldLabel: me.snippets.basePrice.unit,
            emptyText: me.snippets.basePrice.empty,
            displayField: 'name',
            editable:false,
            valueField: 'id',
            labelWidth: 155,
            anchor: '100%',
            xtype: 'textfield'
        });

        return Ext.create('Ext.form.FieldSet', {
            layout: 'anchor',
            cls: Ext.baseCSSPrefix + 'article-base-price-field-set',
            defaults: {
                labelWidth: 155,
                anchor: '100%',
                xtype: 'textfield'
            },
            title: me.snippets.basePrice.title,
            items: [
                me.unitComboBox, {
                    xtype: 'numberfield',
                    submitLocaleSeparator: false,
                    decimalPrecision: 4,
                    name: 'mainDetail[purchaseUnit]',
                    fieldLabel: me.snippets.basePrice.content
                }, {
                    xtype: 'numberfield',
                    submitLocaleSeparator: false,
                    name: 'mainDetail[referenceUnit]',
                    decimalPrecision: 3,
                    fieldLabel: me.snippets.basePrice.basicUnit
                }, {
                    name: 'mainDetail[packUnit]',
                    translationName: 'packUnit',
                    translatable: true,
                    fieldLabel: me.snippets.basePrice.packingUnit
                }
            ]
        });
    },

    /**
     * Creates the description field set for the main form panel.
     * Contains the keywords, short and long description.
     * @return Ext.form.FieldSet
     */
    createDescriptionFieldSet: function() {
        var me = this;

        return Ext.create('Ext.form.FieldSet', {
            layout: 'anchor',
            cls: Ext.baseCSSPrefix + 'article-description-field-set',
            defaults: {
                labelWidth: 155,
                anchor: '100%',
                translatable: true,
                xtype: 'textarea'
            },
            title: me.snippets.descriptions.title,
            items: [
                {
                    xtype: 'tinymce',
                    name: 'descriptionLong',
                    margin: '0 0 15',
                    cls: Ext.baseCSSPrefix + 'article-description-long',
                    height: 100
                }, {
                    name: 'description',
                    height: 100,
                    fieldLabel: me.snippets.descriptions.description.label,
                    supportText: me.snippets.descriptions.description.support
                }, {
                    name: 'keywords',
                    height: 100,
                    fieldLabel: me.snippets.descriptions.keywords.label,
                    supportText: me.snippets.descriptions.keywords.support
                }
            ]
        });
    },

    /**
     * Creates the tab panel tab for the category selection.
     * @return Array
     */
    createCategoryTab: function() {
        var me = this, rightContainer;

        var notice = Ext.String.format(me.snippets.categoryNotice, me.article.get('name'));

        me.categoryTree = Ext.create('Shopware.apps.Article.view.category.Tree', {
            store: me.categoryTreeStore,
            region: 'west'
        });

        me.categoryDropZone = Ext.create('Shopware.apps.Article.view.category.DropZone', {
            flex:1,
            autoScroll:true,
            margin: 10
        });

        me.categoryNotice = Ext.create('Ext.panel.Panel', {
            title: me.snippets.categoryNoticeTitle,
            bodyPadding: 10,
            height: 65,
            margin: 10,
            bodyStyle: 'background: #fff',
            items: [{
                xtype: 'container',
                cls: Ext.baseCSSPrefix + 'global-notice-text',
                html: notice
            }]
        });

        me.categoryList = Ext.create('Shopware.apps.Article.view.category.List', {
            article: me.article,
            flex: 1,
            autoScroll:true,
            margin: 10
        });

        rightContainer = Ext.create('Ext.container.Container', {
            region: 'center',
            bodyPadding: 10,
            name: 'category-tab',
            plain: true,
            autoScroll:true,
            layout: {
                align: 'stretch',
                type: 'vbox'
            },
            items: [
                me.categoryNotice, me.categoryDropZone, me.categoryList
            ]
        });

        return [ me.categoryTree, rightContainer ];
    },

    /**
     * Creates the image tab panel.
     * @return Array
     */
    createImageTab: function() {
        var me = this, leftContainer;

        me.imageList = Ext.create('Shopware.apps.Article.view.image.List', {
            article: me.article,
            margin: '0 10 10',
            flex: 1
        });
        me.imageUpload = Ext.create('Shopware.apps.Article.view.image.Upload', {
            article: me.article,
            margin: 10,
            flex: 1,
            autoScroll:true
        });
        me.imageInfo = Ext.create('Shopware.apps.Article.view.image.Info', {
            margin: 10,
            width: 390,
            configuratorGroupStore: me.configuratorGroupStore
        });

        leftContainer = Ext.create('Ext.container.Container', {
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                me.imageUpload,
                me.imageList
            ]
        });

        return [ leftContainer, me.imageInfo ];
    },

    /**
     * Creates the window toolbar which docked bottom and contains the cancel and save button.
     * @return Ext.toolbar.Toolbar
     */
    createToolbar: function() {
        var me = this;

        //create the save button which fire the save event, the save event is handled in the detail controller.
        me.saveButton = Ext.create('Ext.button.Button', {
            cls:'primary',
            name: 'save-article-button',
            text: me.snippets.save,
            handler: function() {
                me.fireEvent('saveArticle', me, me.article);
            }
        });

        //creates the cancel button which fire the cancel event, the cancel event is handled in the detail controller.
        me.cancelButton = Ext.create('Ext.button.Button', {
            text: me.snippets.cancel,
            name: 'cancel-button',
            cls: 'secondary',
            handler: function() {
                me.fireEvent('cancel', me, me.article);
            }
        });

        //creates the global save button for the configurator
        me.configuratorSaveButton = Ext.create('Ext.button.Button', {
            text: me.snippets.variant.button.configurator,
            cls: 'primary',
            hidden: true,
            name: 'configurator-save-button',
            handler: function() {
                me.variantListing.fireEvent('createVariants', me.article);
            }
        });

        //creates the global save button for the esd
        me.esdSaveButton = Ext.create('Ext.button.Button', {
            text: me.snippets.esd.button.save,
            cls: 'primary',
            hidden: true,
            name: 'esd-save-button',
            handler: function() {
                me.esdListing.fireEvent('saveEsd');
            }
        });

        //creates the global save button for the esd
        me.esdBackButton = Ext.create('Ext.button.Button', {
            text: me.snippets.esd.button.back,
            cls: 'secondary',
            hidden: true,
            name: 'esd-back-button',
            handler: function() {
                me.esdListing.fireEvent('backToList');
            }
        });

        //creates the toolbar with a spaces, the cancel and save button.
        return Ext.create('Ext.toolbar.Toolbar', {
            items: [
                { xtype: 'tbfill' },
                me.cancelButton,
				/*{if {acl_is_allowed privilege=save}}*/
                me.saveButton,
				/*{/if}*/
                me.configuratorSaveButton,
                me.esdBackButton,
                me.esdSaveButton
            ]
        });

    },

    /**
     * Creates the variant tab panel which contains the configuration elements for the article variants and configurator.
     * @return Ext.container.Container
     */
    createVariantTab: function() {
        var me = this, listing, configurator;
        listing = me.createVariantListingTab();
        configurator = me.createVariantConfiguratorTab();

        me.configuratorTab = Ext.create('Ext.tab.Panel', {
            name: 'configurator-tab',
            items: [
                listing,
                configurator
            ],
            margin: 10
        });

        return me.configuratorTab;
    },


    /**
     * Creates the listing component for the variant tab.
     * @return Ext.container.Container
     */
    createVariantListingTab: function() {
        var me = this;

        me.variantStore = Ext.create('Shopware.apps.Article.store.Variant');

        if (me.article) {
            me.variantStore.getProxy().extraParams.articleId = me.article.get('id');
        }

        me.variantListing = Ext.create('Shopware.apps.Article.view.variant.List', {
            border: false,
            store: me.variantStore
        });

        return Ext.create('Ext.container.Container', {
            items: [ me.variantListing ],
            layout: 'fit',
            name: 'listing',
            title: me.snippets.variant.listing
        });
    },

    /**
     * Creates the variant configurator for the variant tab panel.
     * @return Ext.container.Container.
     */
    createVariantConfiguratorTab: function() {
        var me = this;

        return Ext.create('Shopware.apps.Article.view.variant.Configurator', {
            title: me.snippets.variant.configurator,
            article: me.article,
            dependencyStore: me.dependencyStore,
            priceSurchargeStore: me.priceSurchargeStore,
            name: 'configurator',
            configuratorGroupStore: me.configuratorGroupStore,
            articleConfiguratorSet: me.articleConfiguratorSet
        });
    },

    /**
     * Creates the esd tab which contains the configuration for the esd options.
     * @return Ext.container.Container
     */
    createEsdTab: function() {
        var me = this;

        var esdStore      = Ext.create('Shopware.apps.Article.store.Esd');
        var filteredStore = Ext.create('Shopware.apps.Article.store.Esd');
        esdStore.addListener('beforeload', function(store, records) {
            filteredStore.load({
                params: {
                    filterCandidates: true
                }
            });
        });
        esdStore.getProxy().extraParams.articleId = me.article.get('id');
        filteredStore.getProxy().extraParams.articleId = me.article.get('id');

        me.esdListing = Ext.create('Shopware.apps.Article.view.esd.List', {
            esdStore: esdStore,
            filteredStore: filteredStore,
            article: me.article
        });

        return me.esdListing;
    },

    /**
     * Creates the statistic tab which contains a graph for the article sales.
     * @return Array
     */
    createStatisticTab: function() {
        var me = this;

        var statisticStore = Ext.create('Shopware.apps.Article.store.Statistic');
        var chartStore = Ext.create('Shopware.apps.Article.store.Statistic');

        statisticStore.getProxy().extraParams.articleId = me.article.get('id');
        chartStore.getProxy().extraParams.articleId = me.article.get('id');
        chartStore.getProxy().extraParams.chart = true;

        var list = Ext.create('Shopware.apps.Article.view.statistics.List', {
            flex: 1,
            article: me.article,
            store: statisticStore
        });

        var chart = Ext.create('Shopware.apps.Article.view.statistics.Chart', {
            height: 250,
            flex: 1,
            article: me.article,
            store: chartStore
        });

        return [ chart, list ];
    },

    onStoresLoaded: function(article, stores) {
        var me = this;
        me.article = article;
        me.detailForm.add(me.attributeFieldSet);

        me.unitComboBox.bindStore(stores['unit']);
        me.supplierStore = stores['suppliers'];
        window.setTimeout(function() {
            me.detailForm.loadRecord(me.article);
        }, 10);

        me.categoryTab.add(me.createCategoryTab());
        me.categoryTab.setDisabled(false);

        me.imageTab.add(me.createImageTab());
        me.imageTab.setDisabled(false);

        me.variantTab.add(me.createVariantTab());
        /*
        me.variantTab.setDisabled((me.article.get('id') === null || me.article.get('isConfigurator') === false || me.article.get('configuratorSetId') === null))  */

        me.esdTab.add(me.createEsdTab());
        me.esdTab.setDisabled((me.article.get('id') === null));

        me.statisticTab.add(me.createStatisticTab());
        me.statisticTab.setDisabled(me.article.get('id') === null);

        me.variantListing.customerGroupStore = stores['customerGroups'];

        /* me.variantListing.unitStore = stores['unit'];
        me.variantListing.configuratorGroupStore = stores['configuratorGroups'];
        me.variantListing.customerGroupStore = stores['customerGroups'];
        me.variantListing.article = article; */

        if(me.subApp.splitViewActive) {
            me.variantTab.setDisabled(true);
        }
    },

    /**
     * Helper method which is especially for third-party developers which want to to add an additional tab
     * to the main tab panel which is used in the article module. he method provides an easy-to-use way to add a new tab
     * and handles the event binding for further versions of Shopware.
     *
     * @example The following examples shows how to add a tab with a static content:
     * <code>
     * this.registerAdditionalTab({
     *    title: 'Test-Tab',
     *    tabConfig: { disabled: false },
     *    contentFn: function(article, stores, eOpts) {
     *       eOpts.tab.add({ xtype: 'panel', html: 'Tab-Content' });
     *    }
     * });
     * </code>
     *
     * @throws Ext.Error - If no configuration object is passed the method raises an global Ext.Error
     *         which kills the further processing of the method.
     *
     * @param  { Object } opts - Configuration object of the new tab
     *         opts.title - { String } Title of the tab
     *
     *         opts.articleChangeFn - { Function } (optional) The callback method which will be triggered when
     *         the article has been changed. The following parameters are passed to the callback function:
     *             store - { Object } Instance of the `Shopware.apps.Article.store.Batch` which includes the
     *             article data and all available associations which are used by the sub-components of this
     *             component.
     *             eOpts - { Object } Additional event parameters which are set by ExtJS. Please see the documentation
     *             of Ext.util.Observable#addListener` method to see all available parameters.
     *
     *         opts.contentFn - { Function } The callback method which will be used to set the content of the tab.
     *         The following parameters are passed to the callback function:
     *             article - { Object } The article model, e.g. `Shopware.apps.Article.model.Article`
     *             stores - { Object } All available stores of the article main window, which are used by it's sub-
     *             compontents.
     *             eOpts - { Object } Additional event parameters. The following custom paremeters are passed to the
     *             function:
     *                 tab - { Object } The newly created type
     *                 config - { Object } The configuration object which was used to create the tab
     *
     *         opts.insertIndex - { Number } (optional) Numeric position (starting by 0) where the tab will be injected.
     *         If the value is smaller than 0 or isn't passed, the tab will be inserted after the last available tab.
     *
     *         opts.tabConfig - { Object } (optional) Tab configuration of will be passsed in to create the tab
     *         container. To modify the type of the created container, please use the second parameter `containerType`.
     *
     *         opts.scope - { Object } (optional) The scope which will be used in the callback methods `opts.contentFn`
     *         and `opts.articleChangeFn`. If the parameter wasn't passed in, the scope will be set to this component,
     *         e.g. `Shopware.apps.Article.view.detail.Window`.
     *
     * @param  { String } containerType (optional) - ExtJS component name which will be used as the
     *         container for the tab content. The method supports full class names as well as
     *         `xtypes`. If a class name is been used, class name needs to be in the namespace `Ext` or `Shopware`.
     *         Default type is `Ext.container.Container`.
     *
     * @return { Boolean } - Truthy if the tab was sucessfully created, otherwise falsy.
     */
    registerAdditionalTab: function(opts, containerType) {
        var me = this, tabPanel = me.mainTab, tabContainer, cfg = {}, articleChangeFn,
            defaultOpts = {
                'title': 'Tab',
                'articleChangeFn': Ext.emptyFn,
                'contentFn': Ext.emptyFn,
                'insertIndex': -1,
                'tabConfig': {
                    'disabled': true,
                    'layout': 'fit'
                },
                'scope': me
            }, availableStores;

        // We're having no options for the new tab, so raise an error...
        if(!opts || opts.length) {
            Ext.Error.raise({
                sourceClass: me.$className,
                sourceMethod: 'registerAdditionalTab',
                msg: 'The method needs at least a configuration object as a first parameter which ' +
                     'includes the name of the tab and the callback method which inserts the content into '+
                     'the newly created tab. Please see the example usage.'
            });
            return false;
        }

        // Check if the user configuration includes an `contentFn` which creates the content of the tab
        if(!opts || !opts.hasOwnProperty('contentFn')) {
            Ext.Error.raise({
                sourceClass: me.$className,
                sourceMethod: 'registerAdditionalTab',
                msg: 'The method needs a callback method named `contentFn`, which will be used to insert the content ' +
                     'inserts the content of the newly created tab.'
            });
            return false;
        }

        // Modify the passed parameter(s)
        if(containerType && !containerType.match(/^(Ext|Shopware)/)) {

            // Support for passing a `xtype` for the containerType
            containerType = Ext.ClassManager.getNameByAlias(containerType);
        }
        containerType = (containerType && containerType.length) ? containerType : 'Ext.container.Container';

        // Merge the passed user configuration with our default configuration
        cfg = Ext.merge(cfg, defaultOpts, opts);
        articleChangeFn = cfg['articleChangeFn'];

        // Create the tab container
        tabContainer = Ext.create(containerType, Ext.apply(cfg.tabConfig, {
            title: cfg.title
        }));

        // Add the tab container to the main tab panel
        if(cfg.insertIndex >= 0) {
            tabPanel.insert(cfg.insertIndex, tabContainer);
        } else {
            tabPanel.add(tabContainer);
        }

        // Collects the available stores to provide a constant API which is compatible with further versions.
        // It doesn't look great but that is necessary to provide the goal...
        availableStores = {
            customerGroupStore: me.customerGroupStore,
            shopStore: me.shopStore,
            taxStore: me.taxStore,
            attributeFields: me.attributeFields,
            supplierStore: me.supplierStore,
            templateStore: me.templateStore,
            dependencyStore: me.dependencyStore,
            priceSurchargeStore: me.priceSurchargeStore,
            unitStore: me.unitStore,
            propertyStore: me.propertyStore,
            priceGroupStore: me.priceGroupStore,
            articleConfiguratorSet: me.articleConfiguratorSet,
            categoryTreeStore: me.categoryTreeStore,
            configuratorGroupStore: me.configuratorGroupStore
        };

        // Trigger the `contentFn` which sets the content of the tab container
        me.on('storesLoaded', function() {
            cfg['contentFn'].apply(cfg.scope, [ me.article, availableStores, { tab: tabContainer, config: cfg } ]);
        });

        // Bind event listener which triggers when the article store was changed
        me.subApplication.on('ProductModule:storesChanged', articleChangeFn, cfg.scope, {
            tab: tabContainer,
            config: cfg
        });

        return true;
    }
});
//{/block}
