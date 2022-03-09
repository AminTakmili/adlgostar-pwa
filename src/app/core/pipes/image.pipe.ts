import { Pipe } from '@angular/core';
import { environment } from 'src/environments/environment';
@Pipe({ name: 'image' })

export class ImagePipe {
	transform(input: string) {
		if (input !== '') {
			return environment.imageUrl+'storage'+input.slice(6)  ;
		}
	}
}

