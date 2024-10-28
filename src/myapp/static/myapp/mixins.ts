import { Constructor, dedupeMixin } from '@open-wc/dedupe-mixin';
import { View } from '@alexi/pwa/views';
import { Asset } from 'myapp/models.ts';

export const AssetsMixin = dedupeMixin(
  <T extends Constructor<View>>(SuperClass: T) =>
    class AssetsMixin extends SuperClass {
      async list() {
        const instances = await Asset.objects.all().fetch();
        return instances.toArray().map((instance) => instance.serialize());
      }

      async create(obj: any) {
        return await Asset.objects.create(obj);
      }

      async retrieve({ id }: any) {
        return await Asset.objects.get({ id });
      }

      async update({ id, ...obj }: any) {
        return await Asset.objects.update({ id, defaults: obj });
      }

      async partialUpdate({ id, ...obj }: any) {
        return await Asset.objects.update({ id, defaults: obj });
      }

      async destroy({ id }: any) {
        return await Asset.objects.delete({ id });
      }
    },
);
