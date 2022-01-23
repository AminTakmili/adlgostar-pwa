import { Deserializable } from "./deserializable.model";

// export class sideMenu implements Deserializable {
// 	id ! : number;
// 	name ! : string;
// 	url ! : string;
// 	icon ! : string;
// 	submenu ! : sideMenu[];
// 	deserialize(input: any): this {
// 		Object.assign(this, input);
// 		this.submenu = input.submenu.map((column: any) => {
// 			return new sideMenu().deserialize(column);
// 		});
// 		return this;
// 	}
// }
