declare module '*.yaml';
type ID = string;
type UrlString = string;
type TokenString = string;
type JSONTypes = null | boolean | number | string;
type TJSON = JSONTypes | JSONTypes[] | { [prop: string]: JSONTypes };
type JSONObject = { [key: string]: TJSON };
type TStatusCode = number | 'ECONNREFUSED';
