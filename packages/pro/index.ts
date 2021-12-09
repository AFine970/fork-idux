/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { App, Directive } from 'vue'

import { version } from '@idux/components/version'
import { IxLayoutPro, IxLayoutSiderTrigger } from '@idux/pro/layout'

const directives: Record<string, Directive> = {}

const components = [IxLayoutPro, IxLayoutSiderTrigger]

const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name ?? component.displayName, component)
  })

  Object.keys(directives).forEach(key => {
    app.directive(key, directives[key])
  })
}

export default {
  install,
  version,
}