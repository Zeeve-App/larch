export type FilterItem = {
    label: string,
    checked: boolean,
    disabled?: boolean,
    isOpen: boolean
    type: 'searchable' | 'date',
    value: string
    key: string
}