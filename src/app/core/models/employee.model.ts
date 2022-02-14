import { Deserializable } from "./deserializable.model";
import { Media } from "./media.model";
import { Post } from "./post.model";

export class Employee implements Deserializable {
	id!: number;
	employee_status !: string;
	first_name !: string;
	last_name !: string;
	posts !: Post[];
	media !: Media[];
	deserialize(input: any): this {
		this.posts = input.posts.map((item: Post) => {
			return new Post().deserialize(item);
		});
		this.media = input.media.map((item: Media) => {
			return new Media().deserialize(item);
		});
		Object.assign(this, input);
		return this;
	}
}
