<template>
  <div>
    <el-form
      :model="data"
      :rules="rules"
      ref="data"
      :inline="data.inline"
      :label-position="data.labelPosition"
      :label-width="data.labelWidth"
      :label-suffix="data.labelSuffix"
      :show-message="data.showMessage"
      :inline-message="data.inlineMessage"
      :status-icon="data.statusIcon"
      :size="data.size"
      class="formGroup" :class="data.class">
      <el-form-item v-for="(item, i) in data.from" :key="item.key"
                    :label="item.label"
                    :prop="filterPropAttr(item, i)"
                    :label-width="item.labelWidth"
                    :required="item.required"
                    :rules="item.rules"
                    :error="item.error"
                    :show-message="item.showMessage"
                    :inline-message="item.inlineMessage"
                    :size="item.size"
                    :style="{'display': item.display}">
        <label v-if="item.labelSlot" slot="label">
          <slot :name="item.prop" :items="data.from" :index="i" :rows="item"></slot>
        </label>

        <el-input
          v-if="!item.select && !item.radio && !item.checkbox && !item.date && !item.autocomplete && !item.custom && !item.text"
          v-model="item.value"
          :type="item.type"
          :value="item.value"
          :maxlength="item.maxlength"
          :minlength="item.minlength"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          :size="item.size"
          :prefix-icon="item.prefixIcon"
          :suffix-icon="item.suffixIcon"
          :rows="item.rows"
          :autosize="item.autosize"
          :auto-complete="item.autoComplete"
          :readonly="item.readonly"
          :max="item.max"
          :min="item.min"
          :step="item.step"
          :resize="item.resize"
          :autofocus="item.autofocus"
          :form="item.form"
          :label="item.label"
          @blur="inputBlur"
          @focus="inputFocus"
          @keyup.native="keyup(item, i)"
          @change="inputChange">
          <template :class="item.prefixClass" v-if="item.prefix" slot="prefix">
            <slot :name="item.prefix" :items="data.from" :index="i" :rows="item"></slot>
          </template>
          <template :class="item.suffixClass" v-if="item.suffix" slot="suffix">
            <slot :name="item.suffix" :items="data.from" :index="i" :rows="item"></slot>
          </template>
          <template :class="item.prependClass" v-if="item.prepend" slot="prepend">
            <slot :name="item.prepend" :items="data.from" :index="i" :rows="item"></slot>
          </template>
          <template :class="item.appendClass" v-if="item.append" slot="append">
            <slot :name="item.append" :items="data.from" :index="i" :rows="item"></slot>
          </template>
        </el-input>

        <el-autocomplete v-if="item.autocomplete" v-model="item.value" class="inline-input"
                         :placeholder="item.placeholder"
                         :disabled="item.disabled"
                         :valueKey="item.valueKey"
                         :debounce="item.debounce"
                         :popper-class="item.popperClass"
                         :trigger-on-focus="item.triggerOnFocus"
                         :name="item.name"
                         :select-when-unmatched="item.selectWhenUnmatched"
                         :label="item.label"
                         :prefix-icon="item.prefixIcon"
                         :suffix-icon="item.suffixIcon"
                         :fetch-suggestions="querySearch"
                         @select="autocompleteSelect">
          <template :class="item.prefixClass" v-if="item.prefix" slot="prefix">
            <slot :name="item.prefix" :items="data.from" :index="i" :rows="item"></slot>
          </template>
          <template :class="item.suffixClass" v-if="item.suffix" slot="suffix">
            <slot :name="item.suffix" :items="data.from" :index="i" :rows="item"></slot>
          </template>
          <template :class="item.prependClass" v-if="item.prepend" slot="prepend">
            <slot :name="item.prepend" :items="data.from" :index="i" :rows="item"></slot>
          </template>
          <template :class="item.appendClass" v-if="item.append" slot="append">
            <slot :name="item.append" :items="data.from" :index="i" :rows="item"></slot>
          </template>
        </el-autocomplete>

        <el-select v-if="item.select" v-model="item.value" :placeholder="item.placeholder"
                   :multiple="item.multiple"
                   :disabled="item.disabled"
                   :value-key="item.valueKey"
                   :size="item.size"
                   :clearable="item.clearable"
                   :collapse-tags="item.collapseTags"
                   :multiple-limit="item.multipleLimit"
                   :name="item.name"
                   :filterable="item.filterable"
                   :allow-create="item.allowCreate"
                   :filter-method="item.filterMethod"
                   :remote="item.remote"
                   :remote-method="item.remoteMethod"
                   :loading="item.loading"
                   :loading-text="item.loadingText"
                   :no-match-text="item.noMatchText"
                   :no-data-text="item.noDataText"
                   :popper-class="item.popperClass"
                   :reserve-keyword="item.reserveKeyword"
                   :default-first-option="item.defaultFirstOption"
                   @change="selectChange"
                   @visible-change="selectVisibleChange"
                   @remove-tag="selectRemoveTag"
                   @clear="selectClear"
                   @blur="selectBlur"
                   @focus="selectFocus">
          <el-option v-if="!item.optionGroup" v-for="option in item.select" :key="option.label"
                     :label="option.label"
                     :value="option.value"
                     :disabled="option.disabled" @click="optionClick(option)"></el-option>
          <el-option-group v-if="item.optionGroup" v-for="group in item.select" :key="group.label" :label="group.label"
                           :disabled="group.disabled" @click="optionGroupClick(group)">
            <el-option
              v-for="option in group.options"
              :key="option.value"
              :label="option.label"
              :value="option.value" @click="optionClick(option)">
            </el-option>
          </el-option-group>
        </el-select>

        <el-radio-group v-if="item.radio" v-model="item.defaultVal"
                        :size="item.size"
                        :disabled="item.disabled"
                        :text-color="item.textColor"
                        :fill="item.fill"
                        @change="radioGroupChange">
          <el-radio v-if="!item.button" v-for="radio in item.radio" :key="radio.label"
                    :label="radio.label"
                    :disabled="radio.disabled"
                    :border="radio.border"
                    :size="radio.size"
                    :name="radio.name"
                    @change="radioChange">{{radio.text}}
          </el-radio>
          <el-radio-button v-if="item.button" v-for="radio in item.radio" :key="radio.label"
                           :label="radio.label"
                           :name="radio.name"
                           :disabled="item.disabled">{{radio.label}}
          </el-radio-button>
        </el-radio-group>

        <el-checkbox-group v-if="item.checkbox" v-model="item.value" @change="checkboxGroupChange"
                           :size="item.size"
                           :disabled="item.disabled"
                           :min="item.min"
                           :max="item.max"
                           :text-color="item.textColor"
                           :fill="item.fill">
          <el-checkbox v-if="!item.button" v-for="checkbox in item.checkbox" :key="checkbox.label"
                       :label="checkbox.label"
                       :true-label="checkbox.trueLabel"
                       :false-label="checkbox.falseLabel"
                       :disabled="checkbox.disabled"
                       :border="checkbox.border"
                       :size="checkbox.size"
                       :checked="checkbox.checked"
                       :indeterminate="checkbox.indeterminate"
                       :name="checkbox.name"
                       @change="checkboxChange">{{checkbox.label}}
          </el-checkbox>
          <el-checkbox-button v-if="item.button" v-for="checkbox in item.checkbox" :key="checkbox.label"
                              :label="checkbox.label"
                              :true-label="checkbox.trueLabel"
                              :false-label="checkbox.falselabel"
                              :disabled="checkbox.disabled"
                              :name="checkbox.name"
                              :checked="item.checked">{{checkbox.label}}
          </el-checkbox-button>
        </el-checkbox-group>

        <el-date-picker v-if="item.date" v-model="item.value"
                        :readonly="item.date.readonly"
                        :disabled="item.date.disabled"
                        :editable="item.date.editable"
                        :clearable="item.date.clearable"
                        :size="item.date.size"
                        :placeholder="item.date.placeholder"
                        :start-placeholder="item.date.startPlaceholder"
                        :end-placeholder="item.date.endPlaceholder"
                        :type="item.date.type"
                        :format="item.date.format"
                        :align="item.date.align"
                        :popper-class="item.date.popperClass"
                        :picker-options="item.date.pickerOptions"
                        :range-separator="item.date.rangeSeparator"
                        :default-value="item.date.defaultValue"
                        :value-format="item.date.valueFormat"
                        :name="item.date.name"
                        :unlink-panels="item.date.unlinkPanels"
                        @change="dateChange(item.value, item)"
                        @blur="dateBlur"
                        @focus="dateFocus"></el-date-picker>

        <div :class="item.className" v-if="item.text">{{item.text.value}}</div>

        <slot v-if="item.custom" :name="item.prop" :items="data.from" :index="i" :rows="item"></slot>
      </el-form-item>
      <el-form-item class="dataBut" :class="className">
        <el-button v-for="but in dataBut" :key="but.text" :type="but.type" @click="submit('data', but)">{{but.text}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'FormGroup',
  data () {
    return {
      eachDatas: [],
      editData: {},
      searchData: {}
    }
  },
  props: {
    // 生成表单
    data: Object,
    dataForm: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 全局验证器
    rules: Object,
    // 表单按钮
    dataBut: {
      type: Array,
      default: function () {
        return []
      }
    },
    filterProp: Array,
    clear: {
      type: Boolean,
      default: false
    },
    edit: Boolean,
    editAddName: String,
    custom: Boolean,
    className: {
      type: String,
      default: 'btn-cls'
    },
    refs: String
  },
  created () {
    if (this.clear) {
      this.clearEvent(this.$props.data.from)
    }
  },
  methods: {
    filterPropAttr (item, i) {
      return item.hasOwnProperty('value') ? 'from.' + i + '.value' : 'from.' + i + '.defaultVal'
    },
    getData (data, but) {
      let filterGetData = {}
      if (this.edit) {
        if (this.editAddName) {
          data[this.editAddName] = this.editData[this.editAddName]
        } else {
          data.id = this.editData.id
        }
      }
      if (but.addData) {
        but.addData.map(ntem => {
          data[ntem.prop] = ntem.value
        })
      }
      if (JSON.stringify(but.tabDataParams) !== '{}') {
        filterGetData = but.tabDataParams
      } else if (JSON.stringify(this.searchData) !== '{}') {
        filterGetData = this.searchData
      }
      this.$Ajax.post({
        url: but.url,
        data: data,
        cb: res => {
          if (filterGetData) {
            this.$bus.emit('get-table-data', filterGetData, but.refs)
          }
          this.$emit('close-dialog')
        }
      })
    },
    autocompleteSelect (item) {
      this.$emit('autocomplete-select', item)
    },
    querySearch (queryString, cb) {
      this.$emit('query-search', queryString, cb)
    },
    inputBlur (event) {
      this.$emit('input-blur', event)
    },
    inputFocus (event) {
      this.$emit('input-focus', event)
    },
    inputChange (value) {
      this.$emit('input-change', value)
    },
    selectChange (val) {
      this.$emit('select-change', val)
    },
    selectVisibleChange (val) {
      this.$emit('select-visible-change', val)
    },
    selectRemoveTag (val) {
      this.$emit('select-remove-tag', val)
    },
    selectClear (val) {
      this.$emit('select-clear', val)
    },
    selectBlur (event) {
      this.$emit('select-blur', event)
    },
    selectFocus (event) {
      this.$emit('select-focus', event)
    },
    optionClick (option) {
      this.$emit('select-option-click', option)
    },
    optionGroupClick (group) {
      this.$emit('select-option-group-click', group)
    },
    radioGroupChange (val) {
      this.$emit('radio-group-change', val)
    },
    radioChange (val) {
      this.$emit('radio-change', val)
    },
    checkboxGroupChange (val) {
      this.$emit('checkbox-group-change', val)
    },
    checkboxChange (val) {
      this.$emit('checkbox-change', val)
    },
    dateChange (item, items) {
      this.$emit('date-change', item, items)
    },
    dateBlur (event) {
      this.$emit('date-blur', event)
    },
    dateFocus (event) {
      this.$emit('date-focus', event)
    },
    isFunction (text) {
      return typeof text === 'function' ? text() : text
    },
    submit (formName, but) {
      switch (but.key) {
        case 'ok':
          this.ok(formName, but)
          break
        case 'cancel':
          this.cancel(formName, but)
          break
        case 'reset':
          this.reset(formName, but)
          break
        default:
          this.otherBut(formName, but)
      }
    },
    ok (formName, but) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.custom) {
            this.$emit('on-ok', this.createOkData(this.$props.data.from), but, formName)
          } else {
            this.getData(this.createOkData(this.$props.data.from), but)
          }
        } else {
          return false
        }
      })
    },
    filterData (data) {
      let propData = []
      data.map(item => {
        propData.push(item)
        if (item.date) {
          if (item.value !== null) {
            if (item.value && item.value.length === undefined) {
              item.value = this.$Date.dateFormat(item.value, this.$Date.ISO8601_FORMAT_WITHOUT_TIME)
            } else if (item.value.length === 2) {
              propData.push({
                prop: item.prop,
                value: this.$Date.dateFormat(item.value[0], this.$Date.ISO8601_FORMAT_WITHOUT_TIME)
              })
              propData.push({
                prop: 'endTime',
                value: this.$Date.dateFormat(item.value[1], this.$Date.ISO8601_FORMAT_WITHOUT_TIME)
              })
            }
          }
        }
      })
      return propData
    },
    isEmpty (data) {
      return this.filterData(data).filter(item => {
        if (this.edit) {
          return item
        } else {
          return item.value || item.defaultVal === 0 || item.defaultVal
        }
      })
    },
    filterPropData (data) {
      if (Array.isArray(this.filterProp) && this.filterProp.length > 0) {
        let resultFilter = []
        this.isEmpty(data).filter(ntem => {
          this.filterProp.map(ktem => {
            if (ntem.prop !== ktem) {
              resultFilter.push(ntem)
            }
          })
        })
        return resultFilter
      } else {
        return this.isEmpty(data)
      }
    },
    createOkData (data) {
      let obj = {}
      this.filterPropData(data).map(item => {
        obj[item.prop] = item.hasOwnProperty('defaultVal') ? item.defaultVal : item.value
      })
      return obj
    },
    clearEvent (data) {
      return data.map(item => {
        if (item.value && !Array.isArray(item.value)) {
          item.value = ''
        } else if (Array.isArray(item.value)) {
          item.value = []
        }
        return item
      })
    },
    cancel (formName, but) {
      this.$emit('on-cancel', but, formName)
    },
    reset (formName, but) {
      this.resetFields(this.$refs[formName])
      this.$emit('on-reset', but, formName)
    },
    otherBut (formName, but) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit(but.key, this.createOkData(this.$props.data.from), but, formName)
        } else {
          return false
        }
      })
    },
    resetFields () {
      if (this.$refs.data) {
        this.$refs.data.resetFields()
      }
    },
    filterEdit (data, CurrentData) {
      data.map(ntem => {
        for (let s in CurrentData) {
          if (ntem.prop === s) {
            ntem.value = CurrentData[s]
          }
        }
      })
    },
    getValida (res) {
      this.$refs.data.validate((valid) => {
        if (valid) {
          res()
        } else {
          return false
        }
      })
    },
    isError (val, rules, errorDom, errorText, prop, cb) {
      if (val && val.length > 0 && val !== '[]') {
        errorDom.innerHTML = ''
      } else {
        errorDom.innerHTML = errorText
      }
      if (rules.prop === prop) {
        cb()
      }
    },
    costomvalidat (val, rules, errorDom, errorText, prop, cb) {
      this.isError(val, rules, errorDom, errorText, prop, cb)
    },
    keyup (item) {
      this.$emit('keyup', item)
    }
  },
  mounted () {
    this.$bus.on('form-clear', (res) => {
      if (!res) {
        this.resetFields()
      } else {
        if (res === this.refs) {
          this.resetFields()
        }
      }
    })
    this.$bus.on('each-data', (res) => {
      this.eachData(res)
    })
    this.$bus.on('form-edit-data', (data, currentData, searchData) => {
      this.editData = currentData
      this.filterEdit(data, currentData)
      this.searchData = searchData
    })
    this.$bus.on('get-valida', (res) => {
      this.getValida(res)
    })
    this.$bus.on('get-sbumit', (refs, but) => {
      if (refs === this.refs) {
        this.ok('data', but)
      }
    })
  },
  destroyed () {
    this.$bus.off('form-clear')
    this.$bus.off('each-data')
    this.$bus.off('form-edit-data')
    this.$bus.off('get-valida')
    this.$bus.off('get-sbumit')
  }
}
</script>

<style lang="scss" scoped>
  .btn-cls {
    text-align: center;
    margin-top: 30px;
  }
</style>
