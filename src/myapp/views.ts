import { TemplateView, View } from '@alexi/web/views';
import { AssetsMixin } from 'myapp/mixins.ts';

export class MyAppView extends AssetsMixin(TemplateView) {
  templateName = 'myapp/myapp.html';

  async getContextData(request: Request) {
    return {
      hmr: Deno.env.get('HMR') === 'true',
      page: { title: 'Assets' },
      user: JSON.stringify({ displayName: 'John Doe' }),
      assets: JSON.stringify(await this.list()),
    };
  }

  async post(request: Request) {
    const context = super.post(request);

    context['postAsset'] = await this.create({
      id: this.assets.length + 1,
      name: `Asset ${this.assets.length + 1}`,
    });

    return context;
  }

  async put(request: Request) {
    const context = super.put(request);

    context['putAsset'] = await this.update(
      { id: this.params.assetId },
      await request.json(),
    );

    return context;
  }

  async patch(request: Request) {
    const context = super.patch(request);

    context['patchAsset'] = await this.partialUpdate(
      { id: this.params.assetId },
      await request.json(),
    );

    return context;
  }

  async delete(request: Request) {
    const context = super.delete(request);

    context['deleteAsset'] = await this.destroy({ id: this.params.assetId });

    return context;
  }
}

export class AssetsAPIView extends AssetsMixin(View) {
  async get(request: Request) {
    if (this.params.assetId) {
      return this.retrieve({ id: this.params.assetId });
    }

    return await this.list();
  }

  async post(request: Request) {
    return await this.create({
      id: this.assets.length + 1,
      name: `Asset ${this.assets.length + 1}`,
    });
  }

  async put(request: Request) {
    return await this.update({ id: this.params.assetId }, await request.json());
  }

  async patch(request: Request) {
    return await this.partialUpdate(
      { id: this.params.assetId },
      await request.json(),
    );
  }

  async delete(request: Request) {
    return await this.destroy({ id: this.params.assetId });
  }
}
