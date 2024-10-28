import { Constructor, dedupeMixin } from '@open-wc/dedupe-mixin';
import { View } from '@alexi/pwa/views';

export const AssetsMixin = dedupeMixin(
  <T extends Constructor<View>>(SuperClass: T) =>
    class AssetsMixin extends SuperClass {
      assets = [
        { id: 1, name: 'Asset 1' },
        {
          id: 2,
          name: 'Asset 2',
        },
      ];

      async list() {
        return this.assets;
      }

      async create(obj: any) {
        this.assets.push(
          obj,
        );
        return obj;
      }

      async retrieve({ id }: any) {
        return this.assets.find((asset) => asset.id === parseInt(id));
      }

      async update({ id }: any, obj: any) {
        const index = this.assets.findIndex((asset) =>
          asset.id === parseInt(id)
        );
        this.assets[index] = obj;
        return obj;
      }

      async partialUpdate({ id }: any, obj: any) {
        const index = this.assets.findIndex((asset) =>
          asset.id === parseInt(id)
        );
        this.assets[index] = { ...this.assets[index], ...obj };
        return this.assets[index];
      }

      async destroy({ id }: any) {
        const index = this.assets.findIndex((asset) =>
          asset.id === parseInt(id)
        );
        const deleted = this.assets[index];
        this.assets = this.assets.filter((asset) => asset.id !== parseInt(id));
        return deleted;
      }
    },
);
