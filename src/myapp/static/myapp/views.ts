import { LocalRequest, TemplateView } from '@alexi/pwa/views';
import { AssetsMixin } from 'myapp/mixins.ts';

export class CounterView extends AssetsMixin(TemplateView) {
  templateName = 'myapp/counter.ts';

  async getContextData(request: LocalRequest) {
    return {
      page: { title: 'Counter' },
      user: { displayName: 'John Doe' },
      assets: [],
    };
  }
}

export class AssetsView extends AssetsMixin(TemplateView) {
  templateName = 'myapp/assets.ts';

  async getContextData(request: LocalRequest) {
    return {
      page: { title: 'Assets' },
      user: { displayName: 'John Doe' },
      assets: await this.list(),
    };
  }

  async post(request: LocalRequest) {
    const randomName = Math.random().toString(36).substring(7);
    const createdAsset = await this.create({
      name: `Asset ${randomName}`,
    });

    const context = super.post(request);

    context['postAsset'] = createdAsset;

    return context;
  }

  async put(request: LocalRequest) {
    const context = super.put(request);

    context['putAsset'] = await this.update(
      { id: this.params.assetId },
    );

    return context;
  }

  async patch(request: LocalRequest) {
    const context = super.patch(request);

    context['patchAsset'] = await this.partialUpdate(
      { id: this.params.assetId },
    );

    return context;
  }

  async delete(request: LocalRequest) {
    const context = super.delete(request);

    context['deleteAsset'] = await this.destroy({ id: this.params.assetId });

    return context;
  }
}
