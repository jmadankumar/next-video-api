import { Gender } from '../enum';

export function parseGender(val: string): Gender {
  if (val === 'MALE') {
    return Gender.MALE;
  }
  return val === 'FEMALE' ? Gender.FEMALE : Gender.OTHERS;
}
