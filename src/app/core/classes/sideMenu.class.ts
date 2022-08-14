
export class sideMenu  {

	name ? : string = undefined;
	src ? : string = undefined;
	url ? : string = undefined;
	icon ? : string = undefined;
	state ? : string = "close";
	open ? : boolean = false;
	function ? : string = undefined;
	submenu ? : sideMenu[];
	childeren ? : sideMenu[];
	access ? : boolean;

}
