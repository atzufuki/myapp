import { APIView, TemplateView } from '@alexi/web/views.ts';

export class CounterView extends TemplateView {
  templateName = 'myapp/counter.html';

  async get(request: Request) {
    const context = await super.get(request);

    context['page'] = { title: 'Counter' };
    context['user'] = JSON.stringify({ displayName: 'John Doe' });

    return context;
  }
}

export class AssetsView extends TemplateView {
  templateName = 'myapp/assets.html';

  assets = [
    { id: 1, name: 'asset 1' },
    {
      id: 2,
      name: 'asset 2',
    },
  ];

  async get(request: Request) {
    const context = await super.get(request);

    context['hmr'] = Deno.env.get('HMR') === 'true';
    context['page'] = { title: 'Assets' };
    context['user'] = JSON.stringify({ displayName: 'John Doe' });
    context['assets'] = JSON.stringify(this.assets);

    return context;
  }

  async post(request: Request) {
    const created = {
      id: this.assets.length + 1,
      name: `asset ${this.assets.length + 1}`,
    };
    this.assets.push(
      created,
    );

    const context = await super.get(request);

    context['hmr'] = Deno.env.get('HMR') === 'true';
    context['page'] = { title: 'Assets' };
    context['user'] = JSON.stringify({ displayName: 'John Doe' });
    context['assets'] = JSON.stringify(this.assets);

    return context;
  }
}

export class AssetsAPIView extends APIView {
  assets = [
    { id: 1, name: 'asset 1' },
    {
      id: 2,
      name: 'asset 2',
    },
  ];

  async get(request: Request) {
    if (this.params.assetId) {
      return this.assets.find((asset) =>
        asset.id === parseInt(this.params.assetId)
      );
    }

    return this.assets;
  }

  async post(request: Request) {
    const created = {
      id: this.assets.length + 1,
      name: `asset ${this.assets.length + 1}`,
    };
    this.assets.push(
      created,
    );
    return created;
  }
}
