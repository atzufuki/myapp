import TemplateBackend from '@alexi/web/templates';
import { reverse } from '@alexi/web/urls.ts';

export class View {
  declare urlName: string;

  static asView(options?: any) {
    return new this();
  }

  async dispatch(request: Request) {
    let context: { [key: string]: any } = {};

    switch (request.method) {
      case 'GET':
        context = await this.get(request);
        break;
      case 'POST':
        context = await this.post(request);
        break;
      case 'PUT':
        context = await this.put(request);
        break;
      case 'PATCH':
        context = await this.patch(request);
        break;
      default:
        throw new Error('Method not allowed');
    }

    return await this.renderToResponse(context);
  }

  async get(request: Request): Promise<object | null> {
    return {};
  }

  async post(request: Request): Promise<object | null> {
    return {};
  }

  async put(request: Request): Promise<object | null> {
    return {};
  }

  async patch(request: Request): Promise<object | null> {
    return {};
  }

  async renderToResponse(
    context: { [key: string]: any },
  ) {
    const render = JSON.stringify(context);
    return new Response(render, {
      status: 200,
    });
  }
}

export class TemplateView extends View {
  declare templateName: string;

  async renderToResponse(
    context: { [key: string]: any },
  ) {
    const render = await this.render(context);
    return new Response(render, {
      status: 200,
      headers: {
        'content-type': 'text/html',
      },
    });
  }

  async render(context: { [key: string]: any }) {
    const backend = new TemplateBackend();
    const template = await backend.getTemplate(this.templateName);
    return template(context);
  }

  update(render: HTMLElement) {
    document.body.replaceChildren(render);
  }
}

export class APIView extends View {
  declare params: { [key: string]: string };

  private _parseParams(request: Request) {
    const pattern = reverse(this.urlName);
    const requestUrl = new URL(request.url);
    const patternParts = pattern.path.split('/').filter((part) => part !== '');
    const urlParts = requestUrl.pathname.split('/').filter((part) =>
      part !== ''
    );
    const matchedParts = urlParts.slice(0, patternParts.length);
    const path = matchedParts.join('/');
    const paramNames = (pattern.path.match(/:\w+/g) || []).map((name) =>
      name.slice(1)
    );
    const params = {};
    for (const name of paramNames) {
      const index = pattern.path.split('/').indexOf(`:${name}`);
      params[name] = path.split('/')[index];
    }
    this.params = params;
  }

  async dispatch(request: Request) {
    this._parseParams(request);
    return await super.dispatch(request);
  }

  async list(): Promise<any[]> {
    throw new Error('Not implemented');
  }

  async create(obj: any): Promise<any> {
    throw new Error('Not implemented');
  }

  async retrieve({ id }: any): Promise<any> {
    throw new Error('Not implemented');
  }

  async update({ id }: any, obj: any): Promise<any> {
    throw new Error('Not implemented');
  }

  async partialUpdate({ id }: any, obj: any): Promise<any> {
    throw new Error('Not implemented');
  }

  async destroy({ id }: any): Promise<any> {
    throw new Error('Not implemented');
  }
}
