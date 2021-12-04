import GUN from 'gun'
import 'gun/sea'
import { Auth } from 'gun-util'

const peers = [ import.meta.env.VITE_GUN_PEERS as string ]

export const db = GUN({ peers })

export const user = db.user().recall({ sessionStorage: true })

export const auth = Auth.default(db)