/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable  @typescript-eslint/no-explicit-any */

import type { CascaderPanelData, SelectPanelData, TreeSelectPanelData } from './panels'
import type { SearchItemError } from './searchItem'
import type { SearchValue } from './searchValue'
import type { InputFormater, InputParser, PanelRenderContext, Segment } from './segment'
import type { MaybeArray, VKey } from '@idux/cdk/utils'
import type { CascaderExpandTrigger, CascaderStrategy } from '@idux/components/cascader'
import type { DatePanelProps, DateRangePanelProps } from '@idux/components/date-picker'
import type { TreeDragDropOptions } from '@idux/components/tree'
import type { VNodeChild } from 'vue'

interface SearchFieldBase<V = unknown> {
  key: VKey
  label: string
  icon?: string
  multiple?: boolean
  operators?: string[]
  quickSelect?: boolean
  quickSelectSearchable?: boolean
  defaultOperator?: string
  defaultValue?: V
  inputClassName?: string
  containerClassName?: string
  placeholder?: string
  operatorPlaceholder?: string
  customOperatorLabel?: string | ((operator: string) => VNodeChild)
  validator?: (value: SearchValue<V>) => Omit<SearchItemError, 'index'> | undefined
  onPanelVisibleChange?: (visible: boolean) => void
}

interface ResolvedSearchFieldBase<V = unknown> extends SearchFieldBase<V> {
  segments: Segment[]
}

interface SelectSearchFieldBase {
  type: 'select'
  fieldConfig: {
    dataSource: SelectPanelData[]
    multiple?: boolean
    searchable?: boolean
    separator?: string
    showSelectAll?: boolean
    virtual?: boolean
    searchFn?: (data: SelectPanelData, searchText?: string) => boolean
    onSearch?: MaybeArray<(searchValue: string) => void>
  }
}
export type SelectSearchField = SearchFieldBase<VKey | VKey[]> & SelectSearchFieldBase
export type ResolvedSelectSearchField = ResolvedSearchFieldBase<VKey | VKey[]> & SelectSearchFieldBase

interface TreeSelectSearchFieldBase {
  type: 'treeSelect'
  fieldConfig: {
    dataSource: TreeSelectPanelData[]
    multiple?: boolean
    checkable?: boolean
    cascaderStrategy: CascaderStrategy
    draggable?: boolean
    draggableIcon?: string
    showLine?: boolean
    searchable?: boolean
    separator?: string
    virtual?: boolean
    searchFn?: (node: TreeSelectPanelData, searchValue?: string) => boolean

    onCheck?: MaybeArray<(checked: boolean, node: TreeSelectPanelData) => void>
    onDragstart?: MaybeArray<(options: TreeDragDropOptions<any>) => void>
    onDragend?: MaybeArray<(options: TreeDragDropOptions<any>) => void>
    onDragenter?: MaybeArray<(options: TreeDragDropOptions<any>) => void>
    onDragleave?: MaybeArray<(options: TreeDragDropOptions<any>) => void>
    onDragover?: MaybeArray<(options: TreeDragDropOptions<any>) => void>
    onDrop?: MaybeArray<(options: TreeDragDropOptions<any>) => void>
    onExpand?: MaybeArray<(expanded: boolean, node: TreeSelectPanelData) => void>
    onSelect?: MaybeArray<(selected: boolean, node: TreeSelectPanelData) => void>
    onSearch?: MaybeArray<(searchValue: string) => void>
    onLoaded?: MaybeArray<(loadedKeys: any[], node: TreeSelectPanelData) => void>
  }
}
export type TreeSelectSearchField = SearchFieldBase<VKey | VKey[]> & TreeSelectSearchFieldBase
export type ResolvedTreeSelectSearchField = ResolvedSearchFieldBase<VKey | VKey[]> & TreeSelectSearchFieldBase

interface CascaderSearchFieldBase {
  type: 'cascader'
  fieldConfig: {
    dataSource: CascaderPanelData[]
    cascaderStrategy?: CascaderStrategy
    multiple?: boolean
    disableData?: (data: CascaderPanelData) => boolean
    expandIcon?: string
    expandTrigger?: CascaderExpandTrigger
    fullPath?: boolean
    pathSeparator?: string
    searchable?: boolean
    searchFn?: (node: CascaderPanelData, searchValue?: string) => boolean
    separator?: string
    virtual?: boolean
    onExpand?: MaybeArray<(expanded: boolean, data: CascaderPanelData) => void>
    onSearch?: MaybeArray<(searchValue: string) => void>
    onLoaded?: MaybeArray<(loadedKeys: any[], node: TreeSelectPanelData) => void>
  }
}
export type CascaderSearchField = SearchFieldBase<VKey | VKey[] | VKey[][]> & CascaderSearchFieldBase
export type ResolvedCascaderSearchField = ResolvedSearchFieldBase<VKey | VKey[] | VKey[][]> & CascaderSearchFieldBase

interface InputSearchFieldBase {
  type: 'input'
  fieldConfig: {
    trim?: boolean
  }
}
export type InputSearchField = SearchFieldBase<string> & InputSearchFieldBase
export type ResolvedInputSearchField = ResolvedSearchFieldBase<string> & InputSearchFieldBase

interface DatePickerSearchFieldBase {
  type: 'datePicker'
  fieldConfig: {
    format?: string
    type?: DatePanelProps['type']
    cellTooltip?: DatePanelProps['cellTooltip']
    disabledDate?: DatePanelProps['disabledDate']
    timePanelOptions?: DatePanelProps['timePanelOptions']
  }
}
export type DatePickerSearchField = SearchFieldBase<Date> & DatePickerSearchFieldBase
export type ResolvedDatePickerSearchField = ResolvedSearchFieldBase<Date> & DatePickerSearchFieldBase

interface DateRangePickerSearchFieldBase {
  type: 'dateRangePicker'
  fieldConfig: {
    format?: string
    separator?: string
    type?: DateRangePanelProps['type']
    cellTooltip?: DateRangePanelProps['cellTooltip']
    disabledDate?: DateRangePanelProps['disabledDate']
    timePanelOptions?: DateRangePanelProps['timePanelOptions']
  }
}
export type DateRangePickerSearchField = SearchFieldBase<Date[]> & DateRangePickerSearchFieldBase
export type ResolvedDateRangePickerSearchField = ResolvedSearchFieldBase<Date[]> & DateRangePickerSearchFieldBase

interface CustomSearchFieldBase {
  type: 'custom'
  fieldConfig: {
    customPanel?: string | ((context: PanelRenderContext) => VNodeChild)
    format: InputFormater
    parse: InputParser
  }
}
export type CustomSearchField = SearchFieldBase & CustomSearchFieldBase
export type ResolvedCustomSearchField = ResolvedSearchFieldBase & CustomSearchFieldBase

export type SearchField =
  | SelectSearchField
  | TreeSelectSearchField
  | CascaderSearchField
  | InputSearchField
  | DatePickerSearchField
  | DateRangePickerSearchField
  | CustomSearchField

export type ResolvedSearchField =
  | ResolvedSelectSearchField
  | ResolvedTreeSelectSearchField
  | ResolvedCascaderSearchField
  | ResolvedInputSearchField
  | ResolvedDatePickerSearchField
  | ResolvedDateRangePickerSearchField
  | ResolvedCustomSearchField

export const searchDataTypes = [
  'select',
  'treeSelect',
  'cascader',
  'input',
  'datePicker',
  'dateRangePicker',
  'custom',
] as const
export type SearchDataTypes = (typeof searchDataTypes)[number]
