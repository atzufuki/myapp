import { AlexiHTMLElement } from './htmlelement';
import * as builtin from './builtin_elements';

declare global {
  // deno-lint-ignore no-var
  var html: {
    HTMLElement: typeof AlexiHTMLElement;
    Anchor: typeof builtin.Anchor;
    Area: typeof builtin.Area;
    Audio: typeof builtin.Audio;
    BR: typeof builtin.BR;
    Base: typeof builtin.Base;
    Body: typeof builtin.Body;
    Bold: typeof builtin.Bold;
    Button: typeof builtin.Button;
    Canvas: typeof builtin.Canvas;
    DList: typeof builtin.DList;
    Data: typeof builtin.Data;
    DataList: typeof builtin.DataList;
    DDetails: typeof builtin.DDetails;
    Dialog: typeof builtin.Dialog;
    Div: typeof builtin.Div;
    DTerm: typeof builtin.DTerm;
    Embed: typeof builtin.Embed;
    FieldSet: typeof builtin.FieldSet;
    Form: typeof builtin.Form;
    FrameSet: typeof builtin.FrameSet; // deprecated
    HR: typeof builtin.HR;
    Head: typeof builtin.Head;
    Heading1: typeof builtin.Heading1;
    Heading2: typeof builtin.Heading2;
    Heading3: typeof builtin.Heading3;
    Heading4: typeof builtin.Heading4;
    Heading5: typeof builtin.Heading5;
    Heading6: typeof builtin.Heading6;
    Html: typeof builtin.Html;
    IFrame: typeof builtin.IFrame;
    Image: typeof builtin.Image;
    Input: typeof builtin.Input;
    LI: typeof builtin.LI;
    Label: typeof builtin.Label;
    Legend: typeof builtin.Legend;
    Link: typeof builtin.Link;
    Map: typeof builtin.Map;
    Media: typeof builtin.Media;
    Meta: typeof builtin.Meta;
    Meter: typeof builtin.Meter;
    Mod: typeof builtin.Mod;
    Nav: typeof builtin.Nav;
    OList: typeof builtin.OList;
    Object: typeof builtin.Object;
    OptGroup: typeof builtin.OptGroup;
    Option: typeof builtin.Option;
    Output: typeof builtin.Output;
    Paragraph: typeof builtin.Paragraph;
    Picture: typeof builtin.Picture;
    Pre: typeof builtin.Pre;
    Progress: typeof builtin.Progress;
    Quote: typeof builtin.Quote;
    Script: typeof builtin.Script;
    Select: typeof builtin.Select;
    Slot: typeof builtin.Slot;
    Source: typeof builtin.Source;
    Span: typeof builtin.Span;
    Style: typeof builtin.Style;
    TableCaption: typeof builtin.TableCaption;
    TableCell: typeof builtin.TableCell;
    TableCol: typeof builtin.TableCol;
    Table: typeof builtin.Table;
    TableHead: typeof builtin.TableHead;
    TableRow: typeof builtin.TableRow;
    TableSection: typeof builtin.TableSection;
    Template: typeof builtin.Template;
    TextArea: typeof builtin.TextArea;
    Time: typeof builtin.Time;
    Title: typeof builtin.Title;
    Track: typeof builtin.Track;
    UList: typeof builtin.UList;
    Unknown: typeof builtin.Unknown;
    Video: typeof builtin.Video;
  };
}

globalThis.html = {
  HTMLElement: AlexiHTMLElement,
  ...builtin,
};

export { AlexiHTMLElement as HTMLElement };
export * from './builtin_elements';
export * from './utility_types';
