import { type addressLabels, type contactLabels, type emailLabels,type socialNetworkLabels } from './constants'

export type TContactLabel = (typeof contactLabels)[number]
export type TEmailLabel = (typeof emailLabels)[number]
export type TAddressLabel = (typeof addressLabels)[number]
export type TSocialLabel = (typeof socialNetworkLabels)[number]
