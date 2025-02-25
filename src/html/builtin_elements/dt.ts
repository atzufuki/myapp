import { merge } from '../merge.ts';
import { IncomingProps, RenderObject } from '../types.ts';

export type DTermProps<T = unknown> = IncomingProps<HTMLElement, T>;

export class DTermElement<T = unknown> extends HTMLElement {
  static get observedAttributes(): string[] {
    return [];
  }

  static define(name: string) {
    const defined = customElements.get(name) ?? customElements.getName(this);
    if (!defined) {
      customElements.define(name, this, { extends: 'dt' });
    }
  }

  static getName() {
    return customElements.getName(this);
  }

  static getSelector() {
    return `dt[is="${this.getName()}"]`;
  }

  props: Partial<DTermProps<T>>;

  constructor(props?: Partial<DTermProps<T>>) {
    super();
    this.props = props ?? {};
  }

  /**
   * Called each time the element is added to the document.
   */
  connectedCallback(): void {
    const {
      children,
      child,
      textContent,
      innerHTML,
      innerText,
      style,
      dataset,
      ...rest
    } = merge(this.getDefaultProps(), this.props);

    if (style) {
      Object.assign(this.style, style);
    }

    if (dataset) {
      Object.assign(this.dataset, dataset);
    }

    Object.assign(this, rest);

    this.build();

    this.update();
  }

  /**
   * Called each time the element is removed from the document.
   */
  disconnectedCallback(): void {}

  /**
   * Called each time the element is moved to a new document.
   */
  adoptedCallback(): void {}

  /**
   * Called each time any attributes that are listed in the observedAttributes static property are changed, added, removed, or replaced.
   */
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {}

  /**
   * Define default props for this component.
   * @returns {Partial<DTermProps>} Partial props.
   */
  getDefaultProps(): Partial<DTermProps<T>> {
    return {};
  }

  /**
   * Implement a child tree for this component.
   * @returns {RenderObject} The rendered object.
   */
  render(): RenderObject {
    return null;
  }

  /**
   * Builds a child tree for this element.
   */
  build(): void {
    const { children, child, textContent, innerHTML, innerText } = this.props;

    const isHTML = (string: string) => {
      const doc = new DOMParser().parseFromString(string, 'text/html');
      return Array.from(doc.body.childNodes).some(
        (node) => node.nodeType === 1,
      );
    };

    const convert = (content: Node | string | null | undefined) => {
      const isNode = content instanceof Node;
      const isString = typeof content === 'string';
      const isNull = content === null;
      const isUndefined = content === undefined;
      const isSomethingElse = !isNode && !isString && !isNull && !isUndefined;

      if (isSomethingElse) {
        throw new Error(
          'Invalid render type provided. Must follow RenderObject.',
        );
      }

      return content ?? '';
    };

    const content = this.render() ??
      children ??
      child ??
      textContent ??
      innerHTML ??
      innerText;

    if (content instanceof Array) {
      this.replaceChildren(...content.map(convert));
    } else {
      if (typeof content === 'string' && isHTML(content)) {
        this.innerHTML = content;
      } else {
        this.replaceChildren(convert(content));
      }
    }
  }

  /**
   * Implement side effects according to current properties state.
   */
  update(): void {}
}

// Shorthand alias
export { DTermElement as DTerm };
