import { Path } from 'common/enums/path'

export {default} from 'next-auth/middleware'

export const config = {matcher:[Path.PROFILE, Path.PROFILE_SETTINGS]}