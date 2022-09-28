import { Deserializable } from "./deserializable.model";

export class mediaCategory implements Deserializable {
	id!: number;
	name!: string;
	createdAt:string;
	createdAtEn:string;
	updatedAt: string;
	updatedAtEn:string
	editable:boolean
	// subSizes: any;
	deserialize(input: any): this {
		Object.assign(this, input);
		this.editable=false

		return this;
	}
}
export class mediafile implements Deserializable {
	id!: number;
	uploaded_file_category_id!: number;
	sender_id!: number;
	title:string;
	mime_type!: string;
	type!: string;
	srcFile!: string;
	file!: string;
	size!:number
	sizeText!:string
	createdAt:string;
	createdAtEn:string;
	updatedAt: string;
	updatedAtEn!:string
	downloadUrl!:string
	path!:string
	// subSizes: any;
	deserialize(input: any): this {
		Object.assign(this, input);
		if (input.mime_type.startsWith('image')) {
			
			this.file='image'
			this.srcFile='/assets/svg/imageIcon.svg'
		}
		if (input.mime_type.startsWith('application')) {
			this.file='document'
			this.srcFile='/assets/svg/documentIcon.svg'

		}
		if (input.mime_type.startsWith('video')) {
			this.file='video'
			this.srcFile='/assets/svg/vedioIcon.svg'

			
		}
		if (input.mime_type.startsWith('audio')) {
			this.file='audio'
			this.srcFile='/assets/svg/adieuIcon.svg'

		}
		if (input.path) {
			this.downloadUrl='https://rest.adlgostar.com/'+input.path.replace("public", "storage");
			
		}
		if (input.size) {
			input.size>=1000? this.sizeText= (input.size)/1000+' mb': this.sizeText=input.size + ' kb'
		}

		return this;
	}
}
export class Media implements Deserializable {
	id!: number;
	name!: string;
	path!: string;
	mimeType!: string;
	options: mediaOption;
	// subSizes: any;
	deserialize(input: any): this {
		Object.assign(this, input);

		return this;
	}
}
export class mediaOption implements Deserializable {
	subSizes: any;
	// subSizes: any;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
export class subSizes implements Deserializable {
	'1x': string;
	'2x': string;
	'3x': string;
	'4x': string;
	// subSizes: any;
	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
