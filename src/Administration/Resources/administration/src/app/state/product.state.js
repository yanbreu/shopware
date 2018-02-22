import { State } from 'src/core/shopware';

/**
 * @module app/state/product
 */
State.register('product', {
    namespaced: true,
    strict: true,

    state() {
        return {
            // When entities are loaded, we keep a reference to the original version of the data.
            original: {},
            // For each entity we generate a copy which is the version where all changes are applied.
            draft: {}
        };
    },

    getters: {
        products(state) {
            return state.draft;
        }
    },

    actions: {
        /**
         * Get a list of products by offset and limit.
         *
         * @param commit
         * @param offset
         * @param limit
         * @returns {Promise<T>}
         */
        getProductList({ commit }, offset, limit) {
            const providerContainer = Shopware.Application.getContainer('service');
            const productService = providerContainer.productService;

            return productService.getList(offset, limit).then((response) => {
                const products = response.data;
                const total = response.total;

                products.forEach((product) => {
                    commit('initProduct', product);
                });

                return {
                    products,
                    total
                };
            });
        },

        /**
         * Get a product by id.
         * If the product does not exist in the state object, it will be loaded via the API.
         *
         * @param commit
         * @param state
         * @param id
         * @param localCopy
         * @returns {*}
         */
        getProductById({ commit, state }, id, localCopy = false) {
            const product = state.draft[id];

            if (typeof product !== 'undefined' && product.isDetail) {
                return (localCopy === true) ? Shopware.Utils.deepCopyObject(product) : product;
            }

            const providerContainer = Shopware.Application.getContainer('service');
            const productService = providerContainer.productService;

            return productService.getById(id).then((response) => {
                const loadedProduct = response.data;
                loadedProduct.isDetail = true;

                commit('initProduct', loadedProduct);

                return (localCopy === true) ? Shopware.Utils.deepCopyObject(state.draft[id]) : state.draft[id];
            });
        },

        /**
         * Create an empty product object with all possible properties from the entity definition.
         * The object can be used in the data binding for creating a new product.
         * It will be marked with a `ìsNew` property.
         *
         * @param commit
         * @param state
         * @param productId
         * @returns {*}
         */
        createEmptyProduct({ commit, state }, productId = null) {
            if (productId === null) {
                productId = Shopware.Utils.createId();
            }

            if (typeof state.draft[productId] !== 'undefined') {
                return state.draft[productId];
            }

            const product = Shopware.Entity.getRawEntityObject('product', true);

            product.id = productId;
            product.isDetail = true;
            product.isNew = true;

            commit('initProduct', product);

            return productId;
        },

        /**
         * Saves the given product to the server by sending a changeset.
         *
         * @param commit
         * @param state
         * @param product
         * @returns {*}
         */
        saveProduct({ commit, state }, product) {
            if (!product.id) {
                return false;
            }

            const providerContainer = Shopware.Application.getContainer('service');
            const productService = providerContainer.productService;

            const changeset = Shopware.Utils.getObjectChangeSet(state.original[product.id], product);

            if (product.isNew) {
                return productService.create(changeset).then((response) => {
                    const newProduct = response.data[0];

                    commit('initProduct', newProduct);
                    return newProduct;
                });
            }

            if (Shopware.Utils.isEmpty(changeset)) {
                return false;
            }

            return productService.updateById(product.id, changeset).then((response) => {
                commit('initProduct', response.data);
                return response.data;
            });
        }
    },

    mutations: {
        /**
         * Initializes a new product in the state.
         *
         * @param state
         * @param product
         */
        initProduct(state, product) {
            // Do not commit products without identifier
            if (!product.id) {
                return;
            }

            // If the product draft already exists in the state, merge it with the new data
            if (typeof state.draft[product.id] !== 'undefined') {
                product = Object.assign(state.draft[product.id], product);
            }

            product.isLoaded = true;
            state.original[product.id] = Shopware.Utils.deepCopyObject(product);
            state.draft[product.id] = Shopware.Utils.deepCopyObject(product);
        },

        /**
         * Updates a product in the state.
         *
         * @param state
         * @param product
         */
        setProduct(state, product) {
            // Do not commit products without identifier
            if (!product.id) {
                return;
            }

            Object.assign(state.draft[product.id], product);
        }
    }
});