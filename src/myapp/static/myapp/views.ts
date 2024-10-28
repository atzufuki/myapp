import { LocalRequest, TemplateView } from '@alexi/pwa/views.ts';
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
    const context = super.post(request);

    context['postAsset'] = await this.create({
      id: this.assets.length + 1,
      name: `Asset ${this.assets.length + 1}`,
    });

    return context;
  }

  async put(request: LocalRequest) {
    const context = super.put(request);

    context['putAsset'] = await this.update(
      { id: this.params.assetId },
      await request.json(),
    );

    return context;
  }

  async patch(request: LocalRequest) {
    const context = super.patch(request);

    context['patchAsset'] = await this.partialUpdate(
      { id: this.params.assetId },
      await request.json(),
    );

    return context;
  }

  async delete(request: LocalRequest) {
    const context = super.delete(request);

    context['deleteAsset'] = await this.destroy({ id: this.params.assetId });

    return context;
  }
}
