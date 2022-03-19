// export interface TimeZone {
//   label: string;
//   tzCode: string;
//   name: string;
//   utc: string;
// }


export interface TimeZone {
    value:  string;
    abbr:   string;
    offset: number;
    isDst:  boolean;
    text:   string;
    utc:    string[];
}