import { APIView, TemplateView } from '@alexi/web/views';
import { AssetsMixin } from 'myapp/mixins';

export class CounterView extends TemplateView {
  templateName = 'myapp/counter.html';

  async get(request: Request) {
    const context = await super.get(request);

    context['hmr'] = Deno.env.get('HMR') === 'true';
    context['page'] = { title: 'Counter' };
    context['user'] = JSON.stringify({ displayName: 'John Doe' });

    return context;
  }
}

export class AssetsView extends AssetsMixin(TemplateView) {
  templateName = 'myapp/assets.html';

  async get(request: Request) {
    const context = await super.get(request);

    context['hmr'] = Deno.env.get('HMR') === 'true';
    context['page'] = { title: 'Assets' };
    context['user'] = JSON.stringify({ displayName: 'John Doe' });
    context['assets'] = JSON.stringify(this.assets);

    return context;
  }

  async post(request: Request) {
    await this.create({
      id: this.assets.length + 1,
      name: `Asset ${this.assets.length + 1}`,
    });

    const context = await super.get(request);

    context['hmr'] = Deno.env.get('HMR') === 'true';
    context['page'] = { title: 'Assets' };
    context['user'] = JSON.stringify({ displayName: 'John Doe' });
    context['assets'] = JSON.stringify(this.assets);

    return context;
  }
}

export class AssetsAPIView extends AssetsMixin(APIView) {
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
}
