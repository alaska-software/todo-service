import { c as createComponent, h, a0 as Transition, g as getCurrentInstance, A as QSpinner, j as computed, P as onBeforeMount, r as ref, a1 as isRuntimeSsrPreHydration, o as onMounted, w as watch, a2 as onBeforeUpdate, i as inject, a3 as formKey, a as onBeforeUnmount, a4 as debounce, a5 as injectProp, G as stopAndPrevent, n as nextTick, a6 as onDeactivated, a7 as onActivated, B as prevent, Q as QIcon, f as hSlot, a8 as shouldIgnoreKey, J as client, V as stop, a9 as getBtnDesignAttr, z as QBtn, aa as hMergeSlot, ab as provide, ac as vmIsDestroyed, _ as _export_sfc, k as openBlock, m as createBlock, p as withCtx, W as createBaseVNode, t as createVNode, v as toDisplayString, u as createTextVNode, S as createCommentVNode, ad as renderSlot, q as createElementBlock, F as Fragment, x as useRouter } from "./index-D97wSuWx.js";
import { u as useDarkProps, a as useDark } from "./use-dark-BcG_t4pz.js";
import { h as useTransitionProps, i as useTransition, j as getTodoItemById, d as deleteTodoItemById, u as useOperationProgress, k as createTodoItem, l as updateTodoItem, m as addFocusFn, r as removeFocusFn, g as getStateAttributes, f as formatDate, Q as QPageSticky, c as QDialog, B as Banner, C as ConfirmDialog, U as UI_MESSAGES, e as CONFIRM_MESSAGES, n as notify } from "./Banner-fwpL5tCV.js";
import { Q as QHeader, a as QToolbar, b as QToolbarTitle, c as QPageContainer, d as QLayout } from "./QLayout-Dj7pzl-4.js";
import { Q as QPage } from "./QBanner-B1d7JSmM.js";
import "./format-DEDBY0uM.js";
import "./axios-DGUhWzp4.js";
const QInnerLoading = createComponent({
  name: "QInnerLoading",
  props: {
    ...useDarkProps,
    ...useTransitionProps,
    showing: Boolean,
    color: String,
    size: {
      type: [String, Number],
      default: "42px"
    },
    label: String,
    labelClass: String,
    labelStyle: [String, Array, Object]
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const { transitionProps, transitionStyle } = useTransition(props);
    const classes = computed(
      () => "q-inner-loading q--avoid-card-border absolute-full column flex-center" + (isDark.value === true ? " q-inner-loading--dark" : "")
    );
    const labelClass = computed(
      () => "q-inner-loading__label" + (props.labelClass !== void 0 ? ` ${props.labelClass}` : "")
    );
    function getInner() {
      const child = [
        h(QSpinner, {
          size: props.size,
          color: props.color
        })
      ];
      if (props.label !== void 0) {
        child.push(
          h("div", {
            class: labelClass.value,
            style: props.labelStyle
          }, [props.label])
        );
      }
      return child;
    }
    function getContent() {
      return props.showing === true ? h(
        "div",
        { class: classes.value, style: transitionStyle.value },
        slots.default !== void 0 ? slots.default() : getInner()
      ) : null;
    }
    return () => h(Transition, transitionProps.value, getContent);
  }
});
function useTodoItem(id) {
  const todoItem = ref({});
  const errorMessage = ref("");
  const { isDone, isRunning } = useOperationProgress();
  const states = ref([]);
  const priorities = ref([]);
  const isNew = computed(() => id === 0);
  const deleteTodoItem = async () => {
    isRunning.value = true;
    errorMessage.value = "";
    try {
      const envelope = await deleteTodoItemById(id);
      errorMessage.value = envelope.error || "";
    } finally {
      isRunning.value = false;
    }
  };
  const loadTodoItem = async () => {
    isRunning.value = true;
    errorMessage.value = "";
    try {
      const envelope = await getTodoItemById(id);
      errorMessage.value = envelope.error || "";
      if (envelope.result) {
        todoItem.value = envelope.result.data;
        states.value = envelope.result.dictionaries.states;
        priorities.value = envelope.result.dictionaries.priorities;
      }
    } finally {
      isRunning.value = false;
    }
  };
  const saveTodoItem = async () => {
    if (isNew.value) {
      await createTodoItem$1();
    } else {
      await updateTodoItem$1();
    }
  };
  const updateTodoItem$1 = async () => {
    isRunning.value = true;
    errorMessage.value = "";
    try {
      const envelope = await updateTodoItem(todoItem.value);
      errorMessage.value = envelope.error || "";
      if (envelope.result) {
        todoItem.value = envelope.result;
      }
    } finally {
      isRunning.value = false;
    }
  };
  const createTodoItem$1 = async () => {
    isRunning.value = true;
    errorMessage.value = "";
    try {
      const envelope = await createTodoItem(todoItem.value);
      errorMessage.value = envelope.error || "";
      if (envelope.result) {
        todoItem.value = envelope.result;
      }
    } finally {
      isRunning.value = false;
    }
  };
  onBeforeMount(async () => {
    await loadTodoItem();
  });
  return {
    todoItem,
    errorMessage,
    states,
    priorities,
    isNew,
    isDone,
    isRunning,
    load: loadTodoItem,
    remove: deleteTodoItem,
    save: saveTodoItem
  };
}
let buf, bufIdx = 0;
const hexBytes = new Array(256);
for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 256).toString(16).substring(1);
}
const randomBytes = (() => {
  const lib = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes;
    }
    if (lib.getRandomValues !== void 0) {
      return (n) => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes;
      };
    }
  }
  return (n) => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r;
  };
})();
const BUFFER_SIZE = 4096;
function uid() {
  if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }
  const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
}
function parseValue(val) {
  return val === void 0 || val === null ? null : val;
}
function getId(val, required) {
  return val === void 0 || val === null ? required === true ? `f_${uid()}` : null : val;
}
function useId({ getValue, required = true } = {}) {
  if (isRuntimeSsrPreHydration.value === true) {
    const id = getValue !== void 0 ? ref(parseValue(getValue())) : ref(null);
    if (required === true && id.value === null) {
      onMounted(() => {
        id.value = `f_${uid()}`;
      });
    }
    if (getValue !== void 0) {
      watch(getValue, (newId) => {
        id.value = getId(newId, required);
      });
    }
    return id;
  }
  return getValue !== void 0 ? computed(() => getId(getValue(), required)) : ref(`f_${uid()}`);
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs() {
  const { attrs, vnode } = getCurrentInstance();
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  onBeforeUpdate(update);
  update();
  return acc;
}
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    onMounted(() => {
      props.disable !== true && $form.bindComponent(proxy);
    });
    onBeforeUnmount(() => {
      props.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  // -- RFC 5322 --
  // -- Added in v2.6.6 --
  // This is a basic helper validation.
  // For something more complex (like RFC 822) you should write and use your own rule.
  // We won't be accepting PRs to enhance the one below because of the reason above.
  // eslint-disable-next-line
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    default: false,
    // statement unneeded but avoids future vue implementation changes
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(false);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props.rules !== void 0 && props.rules !== null && props.rules.length !== 0
  );
  const canDebounceValidate = computed(() => props.disable !== true && hasRules.value === true && innerLoading.value === false);
  const hasError = computed(
    () => props.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length !== 0 ? props.errorMessage : innerErrorMessage.value);
  watch(() => props.modelValue, () => {
    isDirtyModel.value = true;
    if (canDebounceValidate.value === true && props.lazyRules === false) {
      debouncedValidate();
    }
  });
  function onRulesChange() {
    if (props.lazyRules !== "ondemand" && canDebounceValidate.value === true && isDirtyModel.value === true) {
      debouncedValidate();
    }
  }
  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, onRulesChange, { immediate: true, deep: true });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(() => props.lazyRules, onRulesChange);
  watch(focused, (val) => {
    if (val === true) {
      isDirtyModel.value = true;
    } else if (canDebounceValidate.value === true && props.lazyRules !== "ondemand") {
      debouncedValidate();
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = false;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props.modelValue) {
    if (props.disable === true || hasRules.value === false) {
      return true;
    }
    const index = ++validateIndex;
    const setDirty = innerLoading.value !== true ? () => {
      isDirtyModel.value = true;
    } : () => {
    };
    const update = (err, msg) => {
      err === true && setDirty();
      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val, testPattern);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }
        return false;
      }
    );
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules?.();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length !== 0;
}
const useNonInputFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String
};
const useFieldProps = {
  ...useNonInputFieldProps,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur"];
function useFieldState({ requiredForAttr = true, tagProp, changeEvent = false } = {}) {
  const { props, proxy } = getCurrentInstance();
  const isDark = useDark(props, proxy.$q);
  const targetUid = useId({
    required: requiredForAttr,
    getValue: () => props.for
  });
  return {
    requiredForAttr,
    changeEvent,
    tag: tagProp === true ? computed(() => props.tag) : { value: "label" },
    isDark,
    editable: computed(
      () => props.disable !== true && props.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(),
    targetUid,
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
    /**
         * user supplied additionals:
    
         * innerValue - computed
         * floatingLabel - computed
         * inputRef - computed
    
         * fieldClass - computed
         * hasShadow - computed
    
         * controlEvents - Object with fn(e)
    
         * getControl - fn
         * getInnerAppend - fn
         * getControlChild - fn
         * getShadowControl - fn
         * showPopup - fn
         */
  };
}
function useField(state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer = null;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? ("" + props.modelValue).length : Array.isArray(props.modelValue) === true ? props.modelValue.length : 0;
        const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props.bottomSlots === true || props.hint !== void 0 || hasRules.value === true || props.counter === true || props.error !== null
  );
  const styleType = computed(() => {
    if (props.filled === true) {
      return "filled";
    }
    if (props.outlined === true) {
      return "outlined";
    }
    if (props.borderless === true) {
      return "borderless";
    }
    if (props.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded === true ? " q-field--rounded" : "") + (props.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props.dense === true ? " q-field--dense" : "") + (props.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props.disable === true ? " q-field--disabled" : props.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props.standout === "string" && props.standout.length !== 0 && state.focused.value === true ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : "")
  );
  const hasLabel = computed(
    () => props.labelSlot === true || props.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${props.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {};
    if (state.targetUid.value) {
      acc.for = state.targetUid.value;
    }
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    }
    return acc;
  });
  function focusHandler() {
    const el = document.activeElement;
    let target = state.targetRef?.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target !== el) {
        target?.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) return;
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then?.();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef?.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    state.changeEvent === true && emit("change", null);
    emit("clear", props.modelValue);
    nextTick(() => {
      const isDirty = isDirtyModel.value;
      resetValidation();
      isDirtyModel.value = isDirty;
    });
  }
  function onClearableKeyup(evt) {
    [13, 32].includes(evt.keyCode) && clearValue(evt);
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props.color })]
        )
      );
    } else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            role: "button",
            "aria-hidden": "false",
            "aria-label": $q.lang.label.clear,
            onKeyup: onClearableKeyup,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props.prefix !== void 0 && props.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    props.suffix !== void 0 && props.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [h("div", props.hint)];
        key = `q--slot-hint-${props.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props.counter === true || slots.counter !== void 0;
    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) return;
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace !== true ? "animated" : "stale"),
      onClick: prevent
    }, [
      props.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });
  props.autofocus === true && onMounted(() => {
    proxy.focus();
  });
  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });
  Object.assign(proxy, { focus, blur });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h(state.tag.value, {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const { tokenMap: DEFAULT_TOKEN_MAP, tokenKeys: DEFAULT_TOKEN_MAP_KEYS } = getTokenMap({
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
});
function getTokenMap(tokens) {
  const tokenKeys = Object.keys(tokens);
  const tokenMap = {};
  tokenKeys.forEach((key) => {
    const entry = tokens[key];
    tokenMap[key] = {
      ...entry,
      regex: new RegExp(entry.pattern)
    };
  });
  return { tokenMap, tokenKeys };
}
function getTokenRegexMask(keys) {
  return new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + keys.join("") + "])|(.)", "g");
}
const escRegex = /[.*+?^${}()|[\]\\]/g;
const DEFAULT_TOKEN_REGEX_MASK = getTokenRegexMask(DEFAULT_TOKEN_MAP_KEYS);
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean,
  maskTokens: Object
};
function useMask(props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;
  const tokens = computed(() => {
    if (props.maskTokens === void 0 || props.maskTokens === null) {
      return {
        tokenMap: DEFAULT_TOKEN_MAP,
        tokenRegexMask: DEFAULT_TOKEN_REGEX_MASK
      };
    }
    const { tokenMap: customTokens } = getTokenMap(props.maskTokens);
    const tokenMap = {
      ...DEFAULT_TOKEN_MAP,
      ...customTokens
    };
    return {
      tokenMap,
      tokenRegexMask: getTokenRegexMask(Object.keys(tokenMap))
    };
  });
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props.type);
  }
  watch(() => props.type + props.autogrow, updateMaskInternals);
  watch(() => props.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit("update:modelValue", val);
    }
  });
  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));
      return props.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props.modelValue;
  }
  function getPaddedMaskMarked(size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size);
    }
    let pad = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos !== -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props.mask !== void 0 && props.mask.length !== 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props.mask] === void 0 ? props.mask : NAMED_MASKS[props.mask], fillChar = typeof props.fillMask === "string" && props.fillMask.length !== 0 ? props.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokens.value.tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = tokens.value.tokenMap[token];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp(
      "^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?" + (unmaskChar === "" ? "" : "[" + unmaskChar + "]*") + "$"
    ), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
      if (index === 0 && props.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index === extractLast) {
        return new RegExp(
          "^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props.reverseFillMask === true ? "$" : fillCharEscaped + "*")
        );
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length !== 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked, updateMaskInternalsFlag), masked = props.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props.reverseFillMask !== true) {
        const maxEnd = inp.selectionEnd;
        let cursor = end - 1;
        for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) {
          if (maskMarked[i] !== MARKER) {
            cursor++;
          }
        }
        moveCursor.right(inp, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) !== -1) {
        const cursor = props.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor);
        }
      }
    });
    const val = props.unmaskedValue === true ? unmaskValue(masked) : masked;
    if (String(props.modelValue) !== val && (props.modelValue !== null || val !== "")) {
      emitValue(val, true);
    }
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    pastedTextStart = start;
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, cursor) {
      const noMarkBefore = maskMarked.slice(cursor - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          noMarkBefore === true && cursor++;
          break;
        }
      }
      if (i < 0 && maskMarked[cursor] !== void 0 && maskMarked[cursor] !== MARKER) {
        return moveCursor.right(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    right(inp, cursor) {
      const limit = inp.value.length;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          cursor = i;
        }
      }
      if (i > limit && maskMarked[cursor - 1] !== void 0 && maskMarked[cursor - 1] !== MARKER) {
        return moveCursor.left(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    },
    leftReverse(inp, cursor) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          cursor = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[cursor] !== void 0 && localMaskMarked[cursor] !== MARKER) {
        return moveCursor.rightReverse(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    rightReverse(inp, cursor) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, cursor + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          cursor > 0 && noMarkBefore === true && cursor--;
          break;
        }
      }
      if (i > limit && localMaskMarked[cursor - 1] !== void 0 && localMaskMarked[cursor - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    }
  };
  function onMaskedClick(e) {
    emit("click", e);
    selectionAnchor = void 0;
  }
  function onMaskedKeydown(e) {
    emit("keydown", e);
    if (shouldIgnoreKey(e) === true || e.altKey === true) return;
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (!e.shiftKey) {
      selectionAnchor = void 0;
    }
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (e.shiftKey && selectionAnchor === void 0) {
        selectionAnchor = inp.selectionDirection === "forward" ? start : end;
      }
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, selectionAnchor === start ? end : start);
      if (e.shiftKey) {
        const cursor = inp.selectionStart;
        inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), "forward");
      }
    } else if (e.keyCode === 8 && props.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start);
      inp.setSelectionRange(inp.selectionStart, end, "backward");
    } else if (e.keyCode === 46 && props.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, end);
      inp.setSelectionRange(start, inp.selectionEnd, "forward");
    }
  }
  function maskValue(val, updateMaskInternalsFlag) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props.reverseFillMask === true) {
      return maskValueReverse(val, updateMaskInternalsFlag);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        if (updateMaskInternalsFlag === true && valChar === maskDef) {
          valIndex++;
        }
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val, updateMaskInternalsFlag) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex !== -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        if (updateMaskInternalsFlag === true && valChar === maskDef) {
          valIndex--;
        }
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props.reverseFillMask === true && val.length !== 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown,
    onMaskedClick
  };
}
const useFormProps = {
  name: String
};
function useFormInject(formAttrs = {}) {
  return (child, action, className) => {
    child[action](
      h("input", {
        class: "hidden" + (className || ""),
        ...formAttrs.value
      })
    );
  };
}
function useFormInputNameAttr(props) {
  return computed(() => props.name || props.for);
}
function useFileFormDomProps(props, typeGuard) {
  function getFormDomProps() {
    const model = props.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return computed(() => {
    if (props.type !== "file") return;
    return getFormDomProps();
  });
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) return;
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
const QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    // override of useFieldProps > modelValue
    modelValue: [String, Number, FileList],
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    // makes a textarea
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change",
    "keydown",
    "click",
    "animationend"
  ],
  setup(props, { emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown,
      onMaskedClick
    } = useMask(props, emit, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(
      props
    );
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState({ changeEvent: true });
    const isTextarea = computed(
      () => props.type === "textarea" || props.autogrow === true
    );
    const isTypeText = computed(
      () => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props.type)
    );
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
        evt.onClick = onMaskedClick;
      }
      if (props.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props.autofocus === true || void 0,
        rows: props.type === "textarea" ? 6 : void 0,
        "aria-label": props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props.type;
      }
      if (props.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });
    watch(() => props.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) return;
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      inputRef.value?.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target) return;
      if (props.type === "file") {
        emit("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (e.target.qComposing === true) {
        temp.value = val;
        return;
      }
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props.autogrow === true && adjustHeight();
    }
    function onAnimationend(e) {
      emit("animationend", e);
      adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;
        if (props.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          const { scrollTop } = inp;
          const { overflowY, maxHeight } = $q.platform.is.firefox === true ? {} : window.getComputedStyle(inp);
          const changeOverflow = overflowY !== void 0 && overflowY !== "scroll";
          changeOverflow === true && (inp.style.overflowY = "hidden");
          parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
          inp.style.height = "1px";
          inp.style.height = inp.scrollHeight + "px";
          changeOverflow === true && (inp.style.overflowY = parseInt(maxHeight, 10) < inp.scrollHeight ? "auto" : "hidden");
          parentStyle.marginBottom = "";
          inp.scrollTop = scrollTop;
        }
      });
    }
    function onChange(e) {
      onComposition(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn?.();
      emit("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn?.();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props.autogrow === true ? " q-textarea--autogrow" : "")
      ),
      hasShadow: computed(
        () => props.type !== "file" && typeof props.shadowText === "string" && props.shadowText.length !== 0
      ),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(
        () => hasValue.value === true && (props.type !== "number" || isNaN(innerValue.value) === false) || fieldValueIsFilled(props.displayValue)
      ),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
      // deprecated
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return renderFn;
  }
});
const QBtnGroup = createComponent({
  name: "QBtnGroup",
  props: {
    unelevated: Boolean,
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    square: Boolean,
    push: Boolean,
    stretch: Boolean,
    glossy: Boolean,
    spread: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(() => {
      const cls = ["unelevated", "outline", "flat", "rounded", "square", "push", "stretch", "glossy"].filter((t) => props[t] === true).map((t) => `q-btn-group--${t}`).join(" ");
      return `q-btn-group row no-wrap${cls.length !== 0 ? " " + cls : ""}` + (props.spread === true ? " q-btn-group--spread" : " inline");
    });
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const QBtnToggle = createComponent({
  name: "QBtnToggle",
  props: {
    ...useFormProps,
    modelValue: {
      required: true
    },
    options: {
      type: Array,
      required: true,
      validator: (v) => v.every(
        (opt) => ("label" in opt || "icon" in opt || "slot" in opt) && "value" in opt
      )
    },
    // To avoid seeing the active raise shadow through
    // the transparent button, give it a color (even white)
    color: String,
    textColor: String,
    toggleColor: {
      type: String,
      default: "primary"
    },
    toggleTextColor: String,
    outline: Boolean,
    flat: Boolean,
    unelevated: Boolean,
    rounded: Boolean,
    push: Boolean,
    glossy: Boolean,
    size: String,
    padding: String,
    noCaps: Boolean,
    noWrap: Boolean,
    dense: Boolean,
    readonly: Boolean,
    disable: Boolean,
    stack: Boolean,
    stretch: Boolean,
    spread: Boolean,
    clearable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  emits: ["update:modelValue", "clear", "click"],
  setup(props, { slots, emit }) {
    const hasActiveValue = computed(
      () => props.options.find((opt) => opt.value === props.modelValue) !== void 0
    );
    const formAttrs = computed(() => ({
      type: "hidden",
      name: props.name,
      value: props.modelValue
    }));
    const injectFormInput = useFormInject(formAttrs);
    const btnDesignAttr = computed(() => getBtnDesignAttr(props));
    const btnOptionDesign = computed(() => ({
      rounded: props.rounded,
      dense: props.dense,
      ...btnDesignAttr.value
    }));
    const btnOptions = computed(() => props.options.map((item, i) => {
      const { attrs, value, slot, ...opt } = item;
      return {
        slot,
        props: {
          key: i,
          "aria-pressed": value === props.modelValue ? "true" : "false",
          ...attrs,
          ...opt,
          ...btnOptionDesign.value,
          disable: props.disable === true || opt.disable === true,
          // Options that come from the button specific options first, then from general props
          color: value === props.modelValue ? mergeOpt(opt, "toggleColor") : mergeOpt(opt, "color"),
          textColor: value === props.modelValue ? mergeOpt(opt, "toggleTextColor") : mergeOpt(opt, "textColor"),
          noCaps: mergeOpt(opt, "noCaps") === true,
          noWrap: mergeOpt(opt, "noWrap") === true,
          size: mergeOpt(opt, "size"),
          padding: mergeOpt(opt, "padding"),
          ripple: mergeOpt(opt, "ripple"),
          stack: mergeOpt(opt, "stack") === true,
          stretch: mergeOpt(opt, "stretch") === true,
          onClick(e) {
            set(value, item, e);
          }
        }
      };
    }));
    function set(value, opt, e) {
      if (props.readonly !== true) {
        if (props.modelValue === value) {
          if (props.clearable === true) {
            emit("update:modelValue", null, null);
            emit("clear");
          }
        } else {
          emit("update:modelValue", value, opt);
        }
        emit("click", e);
      }
    }
    function mergeOpt(opt, key) {
      return opt[key] === void 0 ? props[key] : opt[key];
    }
    function getContent() {
      const child = btnOptions.value.map((opt) => {
        return h(QBtn, opt.props, opt.slot !== void 0 ? slots[opt.slot] : void 0);
      });
      if (props.name !== void 0 && props.disable !== true && hasActiveValue.value === true) {
        injectFormInput(child, "push");
      }
      return hMergeSlot(slots.default, child);
    }
    return () => h(QBtnGroup, {
      class: "q-btn-toggle",
      ...btnDesignAttr.value,
      rounded: props.rounded,
      stretch: props.stretch,
      glossy: props.glossy,
      spread: props.spread
    }, getContent);
  }
});
const QForm = createComponent({
  name: "QForm",
  props: {
    autofocus: Boolean,
    noErrorFocus: Boolean,
    noResetFocus: Boolean,
    greedy: Boolean,
    onSubmit: Function
  },
  emits: ["reset", "validationSuccess", "validationError"],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const rootRef = ref(null);
    let validateIndex = 0;
    const registeredComponents = [];
    function validate(shouldFocus) {
      const focus2 = typeof shouldFocus === "boolean" ? shouldFocus : props.noErrorFocus !== true;
      const index = ++validateIndex;
      const emitEvent = (res, ref2) => {
        emit(`validation${res === true ? "Success" : "Error"}`, ref2);
      };
      const validateComponent = (comp) => {
        const valid = comp.validate();
        return typeof valid.then === "function" ? valid.then(
          (valid2) => ({ valid: valid2, comp }),
          (err) => ({ valid: false, comp, err })
        ) : Promise.resolve({ valid, comp });
      };
      const errorsPromise = props.greedy === true ? Promise.all(registeredComponents.map(validateComponent)).then((res) => res.filter((r) => r.valid !== true)) : registeredComponents.reduce(
        (acc, comp) => acc.then(() => {
          return validateComponent(comp).then((r) => {
            if (r.valid === false) {
              return Promise.reject(r);
            }
          });
        }),
        Promise.resolve()
      ).catch((error) => [error]);
      return errorsPromise.then((errors) => {
        if (errors === void 0 || errors.length === 0) {
          index === validateIndex && emitEvent(true);
          return true;
        }
        if (index === validateIndex) {
          const { comp, err } = errors[0];
          err !== void 0 && console.error(err);
          emitEvent(false, comp);
          if (focus2 === true) {
            const activeError = errors.find(({ comp: comp2 }) => typeof comp2.focus === "function" && vmIsDestroyed(comp2.$) === false);
            if (activeError !== void 0) {
              activeError.comp.focus();
            }
          }
        }
        return false;
      });
    }
    function resetValidation() {
      validateIndex++;
      registeredComponents.forEach((comp) => {
        typeof comp.resetValidation === "function" && comp.resetValidation();
      });
    }
    function submit(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      const index = validateIndex + 1;
      validate().then((val) => {
        if (index === validateIndex && val === true) {
          if (props.onSubmit !== void 0) {
            emit("submit", evt);
          } else if (evt?.target !== void 0 && typeof evt.target.submit === "function") {
            evt.target.submit();
          }
        }
      });
    }
    function reset(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      emit("reset");
      nextTick(() => {
        resetValidation();
        if (props.autofocus === true && props.noResetFocus !== true) {
          focus();
        }
      });
    }
    function focus() {
      addFocusFn(() => {
        if (rootRef.value === null) return;
        const target = rootRef.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || rootRef.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || rootRef.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(rootRef.value.querySelectorAll("[tabindex]"), (el) => el.tabIndex !== -1);
        target?.focus({ preventScroll: true });
      });
    }
    provide(formKey, {
      bindComponent(vmProxy) {
        registeredComponents.push(vmProxy);
      },
      unbindComponent(vmProxy) {
        const index = registeredComponents.indexOf(vmProxy);
        if (index !== -1) {
          registeredComponents.splice(index, 1);
        }
      }
    });
    let shouldActivate = false;
    onDeactivated(() => {
      shouldActivate = true;
    });
    onActivated(() => {
      shouldActivate === true && props.autofocus === true && focus();
    });
    onMounted(() => {
      props.autofocus === true && focus();
    });
    Object.assign(vm.proxy, {
      validate,
      resetValidation,
      submit,
      reset,
      focus,
      getValidationComponents: () => registeredComponents
    });
    return () => h("form", {
      class: "q-form",
      ref: rootRef,
      onSubmit: submit,
      onReset: reset
    }, hSlot(slots.default));
  }
});
const _sfc_main$2 = {
  __name: "TodoItemForm",
  props: {
    todoItem: {
      type: Object,
      required: true
    },
    states: {
      type: Array,
      required: true
    },
    priorities: {
      type: Array,
      required: true
    }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    onMounted(() => {
      createStateOptions();
      createPriorityOptions();
    });
    const stateOptions = ref([]);
    const priorityOptions = ref([]);
    const formRef = ref(null);
    const validateTodoItem = async () => {
      return await formRef.value.validate();
    };
    const createStateOptions = () => {
      props.states.forEach((x) => {
        const newItem = {
          value: x.id,
          label: x.name,
          icon: getStateAttributes(x.id).icon
        };
        stateOptions.value.push(newItem);
      });
    };
    const createPriorityOptions = () => {
      props.priorities.forEach((x) => {
        const newItem = {
          value: x.id,
          label: x.id + " " + x.name
        };
        priorityOptions.value.push(newItem);
      });
    };
    const setChanged = () => {
      props.todoItem.changed = /* @__PURE__ */ new Date();
    };
    __expose({
      validateTodoItem
    });
    const __returned__ = { props, stateOptions, priorityOptions, formRef, validateTodoItem, createStateOptions, createPriorityOptions, setChanged, get formatDate() {
      return formatDate;
    }, onMounted, ref, get getStateAttributes() {
      return getStateAttributes;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
const _hoisted_1 = { class: "row" };
const _hoisted_2 = { class: "row" };
const _hoisted_3 = { class: "row" };
const _hoisted_4 = { class: "row justify-between" };
const _hoisted_5 = { class: "column" };
const _hoisted_6 = { class: "row justify-between q-pb-md" };
const _hoisted_7 = { class: "column" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QForm, {
    ref: "formRef",
    class: "q-mt-lg"
  }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createVNode(QInput, {
          modelValue: $props.todoItem.text,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $props.todoItem.text = $event),
          ref: "text",
          "lazy-rules": "",
          rules: [(val) => val && val.length > 0 || "Please type something"],
          outlined: "",
          clearable: "",
          autogrow: "",
          maxlength: "512",
          class: "q-mb-lg full-width",
          label: "Description*",
          hint: "Write what is to be done"
        }, null, 8, ["modelValue", "rules"])
      ]),
      createBaseVNode("div", _hoisted_2, [
        _cache[3] || (_cache[3] = createBaseVNode("span", { class: "text-subtitle1" }, "State", -1)),
        createVNode(QBtnToggle, {
          modelValue: $props.todoItem.state,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $props.todoItem.state = $event),
          "toggle-color": "blue-10",
          class: "q-mb-lg full-width",
          "no-caps": "",
          spread: "",
          options: $setup.stateOptions,
          onClick: $setup.setChanged
        }, null, 8, ["modelValue", "options"])
      ]),
      createBaseVNode("div", _hoisted_3, [
        _cache[4] || (_cache[4] = createBaseVNode("span", { class: "text-subtitle1" }, "Priority", -1)),
        createVNode(QBtnToggle, {
          modelValue: $props.todoItem.priority,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $props.todoItem.priority = $event),
          "toggle-color": "orange-10",
          class: "q-mb-lg full-width",
          "no-caps": "",
          spread: "",
          options: $setup.priorityOptions,
          onClick: $setup.setChanged
        }, null, 8, ["modelValue", "options"])
      ]),
      createBaseVNode("div", _hoisted_4, [
        _cache[5] || (_cache[5] = createBaseVNode("div", { class: "column text-subtitle1" }, "Created at:", -1)),
        createBaseVNode("div", _hoisted_5, toDisplayString($setup.formatDate($props.todoItem.created)), 1)
      ]),
      createBaseVNode("div", _hoisted_6, [
        _cache[6] || (_cache[6] = createBaseVNode("div", { class: "column text-subtitle1" }, "Changed at:", -1)),
        createBaseVNode("div", _hoisted_7, toDisplayString($setup.formatDate($props.todoItem.changed)), 1)
      ])
    ]),
    _: 1
  }, 512);
}
const TodoItemForm = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "TodoItemForm.vue"]]);
const _sfc_main$1 = {
  __name: "SecondaryLayout",
  props: {
    title: {
      type: String,
      required: true
    },
    button: {
      type: Object,
      default: null
    }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const __returned__ = { props };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QLayout, { view: "hHh Lpr lff" }, {
    default: withCtx(() => [
      createVNode(QHeader, { elevated: "" }, {
        default: withCtx(() => [
          createVNode(QToolbar, { class: "bg-blue-10" }, {
            default: withCtx(() => [
              createVNode(QBtn, {
                flat: "",
                dense: "",
                round: "",
                icon: "arrow_back",
                to: "/"
              }),
              createVNode(QToolbarTitle, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString($props.title), 1)
                ]),
                _: 1
              }),
              $props.button?.icon && $props.button?.callback ? (openBlock(), createBlock(QBtn, {
                key: 0,
                flat: "",
                round: "",
                dense: "",
                icon: $props.button.icon,
                disable: $props.button.disable,
                onClick: $props.button.callback
              }, null, 8, ["icon", "disable", "onClick"])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          createVNode(QPage, { class: "q-ma-sm" }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]),
    _: 3
  });
}
const SecondaryLayout = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "SecondaryLayout.vue"]]);
const _sfc_main = {
  __name: "TodoItem",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const $router = useRouter();
    const todoItemFormRef = ref(null);
    const {
      todoItem,
      load,
      save,
      remove,
      isNew,
      errorMessage,
      isDone,
      isRunning,
      states,
      priorities
    } = useTodoItem(props.id);
    const deletionDialog = ref(false);
    const showError = computed(() => isDone.value && errorMessage.value);
    const showLoading = computed(() => isRunning.value && !errorMessage.value);
    const showContent = computed(() => isDone.value && !errorMessage.value);
    const goToIndex = () => {
      $router.push({ name: "index" });
    };
    const saveTodoItem = async () => {
      const valid = await todoItemFormRef.value.validateTodoItem();
      if (valid) {
        await save();
        notify(!!errorMessage.value, UI_MESSAGES.SAVED, errorMessage.value);
        if (!errorMessage.value) {
          goToIndex();
        }
      }
    };
    const deleteTodoItem = async () => {
      await remove();
      notify(!!errorMessage.value, UI_MESSAGES.DELETED, errorMessage.value);
      if (!errorMessage.value) {
        goToIndex();
      }
    };
    const __returned__ = { props, $router, todoItemFormRef, todoItem, load, save, remove, isNew, errorMessage, isDone, isRunning, states, priorities, deletionDialog, showError, showLoading, showContent, goToIndex, saveTodoItem, deleteTodoItem, get useTodoItem() {
      return useTodoItem;
    }, get useRouter() {
      return useRouter;
    }, TodoItemForm, ConfirmDialog, Banner, SecondaryLayout, computed, ref, get notify() {
      return notify;
    }, get CONFIRM_MESSAGES() {
      return CONFIRM_MESSAGES;
    }, get UI_MESSAGES() {
      return UI_MESSAGES;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode($setup["SecondaryLayout"], {
      title: $setup.isNew ? "New todo item" : "Todo Item #" + $props.id,
      button: { icon: "save", callback: $setup.saveTodoItem, disable: $setup.isRunning || !!$setup.errorMessage }
    }, {
      default: withCtx(() => [
        $setup.showError ? (openBlock(), createBlock($setup["Banner"], {
          key: 0,
          message: $setup.errorMessage,
          "icon-color": "orange-10",
          "icon-name": "sentiment_very_dissatisfied",
          "button-label": "Reload",
          "button-callback": $setup.load
        }, null, 8, ["message", "button-callback"])) : createCommentVNode("", true),
        createVNode(QInnerLoading, {
          showing: $setup.showLoading,
          color: "blue-10"
        }, null, 8, ["showing"]),
        $setup.showContent ? (openBlock(), createBlock($setup["TodoItemForm"], {
          key: 1,
          ref: "todoItemFormRef",
          "todo-item": $setup.todoItem,
          states: $setup.states,
          priorities: $setup.priorities
        }, null, 8, ["todo-item", "states", "priorities"])) : createCommentVNode("", true),
        createVNode(QPageSticky, {
          position: "bottom-right",
          offset: [18, 18]
        }, {
          default: withCtx(() => [
            createVNode(QBtn, {
              fab: "",
              icon: "delete",
              disable: $setup.isNew || $setup.isRunning || !!$setup.errorMessage,
              color: "negative",
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.deletionDialog = true)
            }, null, 8, ["disable"])
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["title", "button"]),
    createVNode(QDialog, {
      modelValue: $setup.deletionDialog,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.deletionDialog = $event)
    }, {
      default: withCtx(() => [
        createVNode($setup["ConfirmDialog"], {
          icon: "delete",
          "yes-button-callback": $setup.deleteTodoItem,
          message: $setup.CONFIRM_MESSAGES.DELETE_TODO_ITEM($setup.todoItem?.text)
        }, null, 8, ["message"])
      ]),
      _: 1
    }, 8, ["modelValue"])
  ], 64);
}
const TodoItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "TodoItem.vue"]]);
export {
  TodoItem as default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9kb0l0ZW0tQm5obll0WmEuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW5uZXItbG9hZGluZy9RSW5uZXJMb2FkaW5nLmpzIiwiLi4vLi4vLi4vc3JjL2NvbXBvc2FibGVzL3RvZG9JdGVtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvdWlkL3VpZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1pZC91c2UtaWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2Utc3BsaXQtYXR0cnMvdXNlLXNwbGl0LWF0dHJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvdXNlLWZvcm0vdXNlLWZvcm0tY2hpbGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wYXR0ZXJucy9wYXR0ZXJucy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLXZhbGlkYXRlL3VzZS12YWxpZGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWZpZWxkL3VzZS1maWVsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW5wdXQvdXNlLW1hc2suanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtZm9ybS9wcml2YXRlLnVzZS1mb3JtLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZmlsZS91c2UtZmlsZS1kb20tcHJvcHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1rZXktY29tcG9zaXRpb24vdXNlLWtleS1jb21wb3NpdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvaW5wdXQvUUlucHV0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4tZ3JvdXAvUUJ0bkdyb3VwLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4tdG9nZ2xlL1FCdG5Ub2dnbGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2Zvcm0vUUZvcm0uanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Ub2RvSXRlbUZvcm0udnVlIiwiLi4vLi4vLi4vc3JjL2xheW91dHMvU2Vjb25kYXJ5TGF5b3V0LnZ1ZSIsIi4uLy4uLy4uL3NyYy9wYWdlcy9Ub2RvSXRlbS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIFRyYW5zaXRpb24sIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uL3NwaW5uZXIvUVNwaW5uZXIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUudXNlLWRhcmsvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlVHJhbnNpdGlvbiwgeyB1c2VUcmFuc2l0aW9uUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS10cmFuc2l0aW9uL3VzZS10cmFuc2l0aW9uLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUlubmVyTG9hZGluZycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG4gICAgLi4udXNlVHJhbnNpdGlvblByb3BzLFxuXG4gICAgc2hvd2luZzogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuXG4gICAgc2l6ZToge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogJzQycHgnXG4gICAgfSxcblxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgbGFiZWxDbGFzczogU3RyaW5nLFxuICAgIGxhYmVsU3R5bGU6IFsgU3RyaW5nLCBBcnJheSwgT2JqZWN0IF1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IHsgdHJhbnNpdGlvblByb3BzLCB0cmFuc2l0aW9uU3R5bGUgfSA9IHVzZVRyYW5zaXRpb24ocHJvcHMpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWlubmVyLWxvYWRpbmcgcS0tYXZvaWQtY2FyZC1ib3JkZXIgYWJzb2x1dGUtZnVsbCBjb2x1bW4gZmxleC1jZW50ZXInXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtaW5uZXItbG9hZGluZy0tZGFyaycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBsYWJlbENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWlubmVyLWxvYWRpbmdfX2xhYmVsJ1xuICAgICAgKyAocHJvcHMubGFiZWxDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBwcm9wcy5sYWJlbENsYXNzIH1gIDogJycpXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gZ2V0SW5uZXIgKCkge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoUVNwaW5uZXIsIHtcbiAgICAgICAgICBzaXplOiBwcm9wcy5zaXplLFxuICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvclxuICAgICAgICB9KVxuICAgICAgXVxuXG4gICAgICBpZiAocHJvcHMubGFiZWwgIT09IHZvaWQgMCkge1xuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiBsYWJlbENsYXNzLnZhbHVlLFxuICAgICAgICAgICAgc3R5bGU6IHByb3BzLmxhYmVsU3R5bGVcbiAgICAgICAgICB9LCBbIHByb3BzLmxhYmVsIF0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoaWxkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICByZXR1cm4gcHJvcHMuc2hvd2luZyA9PT0gdHJ1ZVxuICAgICAgICA/IGgoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSwgc3R5bGU6IHRyYW5zaXRpb25TdHlsZS52YWx1ZSB9LFxuICAgICAgICAgIHNsb3RzLmRlZmF1bHQgIT09IHZvaWQgMFxuICAgICAgICAgICAgPyBzbG90cy5kZWZhdWx0KClcbiAgICAgICAgICAgIDogZ2V0SW5uZXIoKVxuICAgICAgICApXG4gICAgICAgIDogbnVsbFxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBoKFRyYW5zaXRpb24sIHRyYW5zaXRpb25Qcm9wcy52YWx1ZSwgZ2V0Q29udGVudClcbiAgfVxufSlcbiIsIi8qKlxuICogQ29tcG9zYWJsZSB1c2VUb2RvSXRlbSgpXG4gKiBFbmNhcHN1bGF0ZXMgc3RhdGUgYW5kIGxvZ2ljIG5lZWRlZCB0byBtYW5pcHVsYXRlIGEgdG9kbyBpdGVtLlxuICogQGNvcHlyaWdodCBBbGFza2EgU29mdHdhcmUgSW5jLiAoYykgMjAyNi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqL1xuXG5pbXBvcnQge2NvbXB1dGVkLCBvbkJlZm9yZU1vdW50LCByZWZ9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7dXNlT3BlcmF0aW9uUHJvZ3Jlc3N9IGZyb20gXCJzcmMvY29tcG9zYWJsZXMvb3BlcmF0aW9uUHJvZ3Jlc3MuanNcIjtcbmltcG9ydCAqIGFzIGRhdGFTZXJ2aWNlIGZyb20gXCJzcmMvc2VydmljZXMvZGF0YVNlcnZpY2VcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVRvZG9JdGVtKGlkKSB7XG4gICAgY29uc3QgdG9kb0l0ZW0gPSByZWYoe30pO1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IHJlZihcIlwiKTtcbiAgICBjb25zdCB7aXNEb25lLCBpc1J1bm5pbmd9ID0gdXNlT3BlcmF0aW9uUHJvZ3Jlc3MoKTtcbiAgICBjb25zdCBzdGF0ZXMgPSByZWYoW10pO1xuICAgIGNvbnN0IHByaW9yaXRpZXMgPSByZWYoW10pO1xuICAgIGNvbnN0IGlzTmV3ID0gY29tcHV0ZWQoKCkgPT4gaWQgPT09IDApO1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyB0aGUgY3VycmVudCB0b2RvIGl0ZW1cbiAgICAgKi9cbiAgICBjb25zdCBkZWxldGVUb2RvSXRlbSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaXNSdW5uaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLnZhbHVlID0gXCJcIjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZW52ZWxvcGUgPSBhd2FpdCBkYXRhU2VydmljZS5kZWxldGVUb2RvSXRlbUJ5SWQoaWQpO1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlLnZhbHVlID0gZW52ZWxvcGUuZXJyb3IgfHwgXCJcIjtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlzUnVubmluZy52YWx1ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgYSB0b2RvIGl0ZW0gZnJvbSB0aGUgYmFja2VuZFxuICAgICAqL1xuICAgIGNvbnN0IGxvYWRUb2RvSXRlbSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaXNSdW5uaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLnZhbHVlID0gXCJcIjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZW52ZWxvcGUgPSBhd2FpdCBkYXRhU2VydmljZS5nZXRUb2RvSXRlbUJ5SWQoaWQpO1xuICAgICAgICAgICAgZXJyb3JNZXNzYWdlLnZhbHVlID0gZW52ZWxvcGUuZXJyb3IgfHwgXCJcIjtcblxuICAgICAgICAgICAgaWYgKGVudmVsb3BlLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHRvZG9JdGVtLnZhbHVlID0gZW52ZWxvcGUucmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgc3RhdGVzLnZhbHVlID0gZW52ZWxvcGUucmVzdWx0LmRpY3Rpb25hcmllcy5zdGF0ZXM7XG4gICAgICAgICAgICAgICAgcHJpb3JpdGllcy52YWx1ZSA9IGVudmVsb3BlLnJlc3VsdC5kaWN0aW9uYXJpZXMucHJpb3JpdGllcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlzUnVubmluZy52YWx1ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2F2ZXMgdGhlIHRvZG8gaXRlbSAoY3JlYXRlcyBuZXcgb3IgdXBkYXRlcyBleGlzdGluZylcbiAgICAgKi9cbiAgICBjb25zdCBzYXZlVG9kb0l0ZW0gPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIC8vIElmIGl0J3MgYSBuZXcgaXRlbSwgY3JlYXRlIGl0OyBvdGhlcndpc2UgdXBkYXRlIGl0XG4gICAgICAgIGlmIChpc05ldy52YWx1ZSkge1xuICAgICAgICAgICAgYXdhaXQgY3JlYXRlVG9kb0l0ZW0oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHVwZGF0ZVRvZG9JdGVtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIGFuIGV4aXN0aW5nIHRvZG8gaXRlbVxuICAgICAqL1xuICAgIGNvbnN0IHVwZGF0ZVRvZG9JdGVtID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBpc1J1bm5pbmcudmFsdWUgPSB0cnVlO1xuICAgICAgICBlcnJvck1lc3NhZ2UudmFsdWUgPSBcIlwiO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBlbnZlbG9wZSA9IGF3YWl0IGRhdGFTZXJ2aWNlLnVwZGF0ZVRvZG9JdGVtKHRvZG9JdGVtLnZhbHVlKTtcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZS52YWx1ZSA9IGVudmVsb3BlLmVycm9yIHx8IFwiXCI7XG5cbiAgICAgICAgICAgIGlmIChlbnZlbG9wZS5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICB0b2RvSXRlbS52YWx1ZSA9IGVudmVsb3BlLnJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlzUnVubmluZy52YWx1ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyB0b2RvIGl0ZW1cbiAgICAgKi9cbiAgICBjb25zdCBjcmVhdGVUb2RvSXRlbSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgaXNSdW5uaW5nLnZhbHVlID0gdHJ1ZTtcbiAgICAgICAgZXJyb3JNZXNzYWdlLnZhbHVlID0gXCJcIjtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZW52ZWxvcGUgPSBhd2FpdCBkYXRhU2VydmljZS5jcmVhdGVUb2RvSXRlbSh0b2RvSXRlbS52YWx1ZSk7XG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UudmFsdWUgPSBlbnZlbG9wZS5lcnJvciB8fCBcIlwiO1xuXG4gICAgICAgICAgICBpZiAoZW52ZWxvcGUucmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdG9kb0l0ZW0udmFsdWUgPSBlbnZlbG9wZS5yZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpc1J1bm5pbmcudmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG9uQmVmb3JlTW91bnQgaXMgYSBWdWUgbGlmZWN5Y2xlIGhvb2sgdGhhdCBydW5zIGJlZm9yZSB0aGUgY29tcG9uZW50J3MgRE9NIGlzIGNyZWF0ZWRcbiAgICBvbkJlZm9yZU1vdW50KGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgbG9hZFRvZG9JdGVtKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b2RvSXRlbSxcbiAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICBzdGF0ZXMsXG4gICAgICAgIHByaW9yaXRpZXMsXG4gICAgICAgIGlzTmV3LFxuICAgICAgICBpc0RvbmUsXG4gICAgICAgIGlzUnVubmluZyxcbiAgICAgICAgbG9hZDogbG9hZFRvZG9JdGVtLFxuICAgICAgICByZW1vdmU6IGRlbGV0ZVRvZG9JdGVtLFxuICAgICAgICBzYXZlOiBzYXZlVG9kb0l0ZW1cbiAgICB9XG59XG4iLCIvKipcbiAqIEJhc2VkIG9uIHRoZSB3b3JrIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9qY2hvb2svdXVpZC1yYW5kb21cbiAqL1xuXG5sZXRcbiAgYnVmLFxuICBidWZJZHggPSAwXG5jb25zdCBoZXhCeXRlcyA9IG5ldyBBcnJheSgyNTYpXG5cbi8vIFByZS1jYWxjdWxhdGUgdG9TdHJpbmcoMTYpIGZvciBzcGVlZFxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICBoZXhCeXRlc1sgaSBdID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKVxufVxuXG4vLyBVc2UgYmVzdCBhdmFpbGFibGUgUFJOR1xuY29uc3QgcmFuZG9tQnl0ZXMgPSAoKCkgPT4ge1xuICAvLyBOb2RlICYgQnJvd3NlciBzdXBwb3J0XG4gIGNvbnN0IGxpYiA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnXG4gICAgPyBjcnlwdG9cbiAgICA6IChcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICA/IHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvXG4gICAgICAgICAgOiB2b2lkIDBcbiAgICAgIClcblxuICBpZiAobGliICE9PSB2b2lkIDApIHtcbiAgICBpZiAobGliLnJhbmRvbUJ5dGVzICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBsaWIucmFuZG9tQnl0ZXNcbiAgICB9XG4gICAgaWYgKGxpYi5nZXRSYW5kb21WYWx1ZXMgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIG4gPT4ge1xuICAgICAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KG4pXG4gICAgICAgIGxpYi5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpXG4gICAgICAgIHJldHVybiBieXRlc1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuID0+IHtcbiAgICBjb25zdCByID0gW11cbiAgICBmb3IgKGxldCBpID0gbjsgaSA+IDA7IGktLSkge1xuICAgICAgci5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpXG4gICAgfVxuICAgIHJldHVybiByXG4gIH1cbn0pKClcblxuLy8gQnVmZmVyIHJhbmRvbSBudW1iZXJzIGZvciBzcGVlZFxuLy8gUmVkdWNlIG1lbW9yeSB1c2FnZSBieSBkZWNyZWFzaW5nIHRoaXMgbnVtYmVyIChtaW4gMTYpXG4vLyBvciBpbXByb3ZlIHNwZWVkIGJ5IGluY3JlYXNpbmcgdGhpcyBudW1iZXIgKHRyeSAxNjM4NClcbmNvbnN0IEJVRkZFUl9TSVpFID0gNDA5NlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIC8vIEJ1ZmZlciBzb21lIHJhbmRvbSBieXRlcyBmb3Igc3BlZWRcbiAgaWYgKGJ1ZiA9PT0gdm9pZCAwIHx8IChidWZJZHggKyAxNiA+IEJVRkZFUl9TSVpFKSkge1xuICAgIGJ1ZklkeCA9IDBcbiAgICBidWYgPSByYW5kb21CeXRlcyhCVUZGRVJfU0laRSlcbiAgfVxuXG4gIGNvbnN0IGIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChidWYsIGJ1ZklkeCwgKGJ1ZklkeCArPSAxNikpXG4gIGJbIDYgXSA9IChiWyA2IF0gJiAweDBmKSB8IDB4NDBcbiAgYlsgOCBdID0gKGJbIDggXSAmIDB4M2YpIHwgMHg4MFxuXG4gIHJldHVybiBoZXhCeXRlc1sgYlsgMCBdIF0gKyBoZXhCeXRlc1sgYlsgMSBdIF1cbiAgICArIGhleEJ5dGVzWyBiWyAyIF0gXSArIGhleEJ5dGVzWyBiWyAzIF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDQgXSBdICsgaGV4Qnl0ZXNbIGJbIDUgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgNiBdIF0gKyBoZXhCeXRlc1sgYlsgNyBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA4IF0gXSArIGhleEJ5dGVzWyBiWyA5IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDEwIF0gXSArIGhleEJ5dGVzWyBiWyAxMSBdIF1cbiAgICArIGhleEJ5dGVzWyBiWyAxMiBdIF0gKyBoZXhCeXRlc1sgYlsgMTMgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMTQgXSBdICsgaGV4Qnl0ZXNbIGJbIDE1IF0gXVxufVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uTW91bnRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVpZCBmcm9tICcuLi8uLi91dGlscy91aWQvdWlkLmpzJ1xuXG5pbXBvcnQgeyBpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24gfSBmcm9tICcuLi8uLi9wbHVnaW5zL3BsYXRmb3JtL1BsYXRmb3JtLmpzJ1xuXG5mdW5jdGlvbiBwYXJzZVZhbHVlICh2YWwpIHtcbiAgcmV0dXJuIHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbFxuICAgID8gbnVsbFxuICAgIDogdmFsXG59XG5cbmZ1bmN0aW9uIGdldElkICh2YWwsIHJlcXVpcmVkKSB7XG4gIHJldHVybiB2YWwgPT09IHZvaWQgMCB8fCB2YWwgPT09IG51bGxcbiAgICA/IChyZXF1aXJlZCA9PT0gdHJ1ZSA/IGBmXyR7IHVpZCgpIH1gIDogbnVsbClcbiAgICA6IHZhbFxufVxuXG4vKipcbiAqIFJldHVybnMgYW4gXCJpZFwiIHdoaWNoIGlzIGEgcmVmKCkgdGhhdCBjYW4gYmUgdXNlZCBhc1xuICogYSB1bmlxdWUgaWRlbnRpZmllciB0byBhcHBseSB0byBhIERPTSBub2RlIGF0dHJpYnV0ZS5cbiAqXG4gKiBPbiBTU1IsIGl0IHRha2VzIGNhcmUgb2YgZ2VuZXJhdGluZyB0aGUgaWQgb24gdGhlIGNsaWVudCBzaWRlIChvbmx5KSB0b1xuICogYXZvaWQgaHlkcmF0aW9uIGVycm9ycy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgZ2V0VmFsdWUsIHJlcXVpcmVkID0gdHJ1ZSB9ID0ge30pIHtcbiAgaWYgKGlzUnVudGltZVNzclByZUh5ZHJhdGlvbi52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgIGNvbnN0IGlkID0gZ2V0VmFsdWUgIT09IHZvaWQgMFxuICAgICAgPyByZWYocGFyc2VWYWx1ZShnZXRWYWx1ZSgpKSlcbiAgICAgIDogcmVmKG51bGwpXG5cbiAgICBpZiAocmVxdWlyZWQgPT09IHRydWUgJiYgaWQudmFsdWUgPT09IG51bGwpIHtcbiAgICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICAgIGlkLnZhbHVlID0gYGZfJHsgdWlkKCkgfWAgLy8gZ2V0SWQobnVsbCwgdHJ1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGdldFZhbHVlICE9PSB2b2lkIDApIHtcbiAgICAgIHdhdGNoKGdldFZhbHVlLCBuZXdJZCA9PiB7XG4gICAgICAgIGlkLnZhbHVlID0gZ2V0SWQobmV3SWQsIHJlcXVpcmVkKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gaWRcbiAgfVxuXG4gIHJldHVybiBnZXRWYWx1ZSAhPT0gdm9pZCAwXG4gICAgPyBjb21wdXRlZCgoKSA9PiBnZXRJZChnZXRWYWx1ZSgpLCByZXF1aXJlZCkpXG4gICAgOiByZWYoYGZfJHsgdWlkKCkgfWApIC8vIGdldElkKG51bGwsIHRydWUpXG59XG4iLCJpbXBvcnQgeyByZWYsIG9uQmVmb3JlVXBkYXRlLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmNvbnN0IGxpc3RlbmVyUkUgPSAvXm9uW0EtWl0vXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgeyBhdHRycywgdm5vZGUgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgYWNjID0ge1xuICAgIGxpc3RlbmVyczogcmVmKHt9KSxcbiAgICBhdHRyaWJ1dGVzOiByZWYoe30pXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7fVxuICAgIGNvbnN0IGxpc3RlbmVycyA9IHt9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRycykge1xuICAgICAgaWYgKGtleSAhPT0gJ2NsYXNzJyAmJiBrZXkgIT09ICdzdHlsZScgJiYgbGlzdGVuZXJSRS50ZXN0KGtleSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGF0dHJpYnV0ZXNbIGtleSBdID0gYXR0cnNbIGtleSBdXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdm5vZGUucHJvcHMpIHtcbiAgICAgIGlmIChsaXN0ZW5lclJFLnRlc3Qoa2V5KSA9PT0gdHJ1ZSkge1xuICAgICAgICBsaXN0ZW5lcnNbIGtleSBdID0gdm5vZGUucHJvcHNbIGtleSBdXG4gICAgICB9XG4gICAgfVxuXG4gICAgYWNjLmF0dHJpYnV0ZXMudmFsdWUgPSBhdHRyaWJ1dGVzXG4gICAgYWNjLmxpc3RlbmVycy52YWx1ZSA9IGxpc3RlbmVyc1xuICB9XG5cbiAgb25CZWZvcmVVcGRhdGUodXBkYXRlKVxuXG4gIHVwZGF0ZSgpXG5cbiAgcmV0dXJuIGFjY1xufVxuIiwiaW1wb3J0IHsgaW5qZWN0LCB3YXRjaCwgZ2V0Q3VycmVudEluc3RhbmNlLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgZm9ybUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyB2YWxpZGF0ZSwgcmVzZXRWYWxpZGF0aW9uLCByZXF1aXJlc1FGb3JtIH0pIHtcbiAgY29uc3QgJGZvcm0gPSBpbmplY3QoZm9ybUtleSwgZmFsc2UpXG5cbiAgaWYgKCRmb3JtICE9PSBmYWxzZSkge1xuICAgIGNvbnN0IHsgcHJvcHMsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgLy8gZXhwb3J0IHB1YmxpYyBtZXRob2QgKHNvIGl0IGNhbiBiZSB1c2VkIGluIFFGb3JtKVxuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuZGlzYWJsZSwgdmFsID0+IHtcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgdHlwZW9mIHJlc2V0VmFsaWRhdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiByZXNldFZhbGlkYXRpb24oKVxuICAgICAgICAkZm9ybS51bmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgJGZvcm0uYmluZENvbXBvbmVudChwcm94eSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIC8vIHJlZ2lzdGVyIHRvIHBhcmVudCBRRm9ybVxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiAkZm9ybS5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgIH0pXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgLy8gdW4tcmVnaXN0ZXIgZnJvbSBwYXJlbnQgUUZvcm1cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgJGZvcm0udW5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgIH0pXG4gIH1cbiAgZWxzZSBpZiAocmVxdWlyZXNRRm9ybSA9PT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1BhcmVudCBRRm9ybSBub3QgZm91bmQgb24gdXNlRm9ybUNoaWxkKCkhJylcbiAgfVxufVxuIiwiLy8gZmlsZSByZWZlcmVuY2VkIGZyb20gZG9jc1xuXG5jb25zdFxuICBoZXggPSAvXiNbMC05YS1mQS1GXXszfShbMC05YS1mQS1GXXszfSk/JC8sXG4gIGhleGEgPSAvXiNbMC05YS1mQS1GXXs0fShbMC05YS1mQS1GXXs0fSk/JC8sXG4gIGhleE9ySGV4YSA9IC9eIyhbMC05YS1mQS1GXXszfXxbMC05YS1mQS1GXXs0fXxbMC05YS1mQS1GXXs2fXxbMC05YS1mQS1GXXs4fSkkLyxcbiAgcmdiID0gL15yZ2JcXCgoKDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKSwpezJ9KDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKVxcKSQvLFxuICByZ2JhID0gL15yZ2JhXFwoKCgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKXsyfSgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKDB8MFxcLlswLTldK1sxLTldfDBcXC5bMS05XSt8MSlcXCkkL1xuXG4vLyBLZWVwIGluIHN5bmMgd2l0aCB1aS90eXBlcy9hcGkvdmFsaWRhdGlvbi5kLnRzXG5leHBvcnQgY29uc3QgdGVzdFBhdHRlcm4gPSB7XG4gIGRhdGU6IHYgPT4gL14tP1tcXGRdK1xcL1swLTFdXFxkXFwvWzAtM11cXGQkLy50ZXN0KHYpLFxuICB0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkJC8udGVzdCh2KSxcbiAgZnVsbHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQ6WzAtNV1cXGQkLy50ZXN0KHYpLFxuICB0aW1lT3JGdWxsdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZCg6WzAtNV1cXGQpPyQvLnRlc3QodiksXG5cbiAgLy8gLS0gUkZDIDUzMjIgLS1cbiAgLy8gLS0gQWRkZWQgaW4gdjIuNi42IC0tXG4gIC8vIFRoaXMgaXMgYSBiYXNpYyBoZWxwZXIgdmFsaWRhdGlvbi5cbiAgLy8gRm9yIHNvbWV0aGluZyBtb3JlIGNvbXBsZXggKGxpa2UgUkZDIDgyMikgeW91IHNob3VsZCB3cml0ZSBhbmQgdXNlIHlvdXIgb3duIHJ1bGUuXG4gIC8vIFdlIHdvbid0IGJlIGFjY2VwdGluZyBQUnMgdG8gZW5oYW5jZSB0aGUgb25lIGJlbG93IGJlY2F1c2Ugb2YgdGhlIHJlYXNvbiBhYm92ZS5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGVtYWlsOiB2ID0+IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLnRlc3QodiksXG5cbiAgaGV4Q29sb3I6IHYgPT4gaGV4LnRlc3QodiksXG4gIGhleGFDb2xvcjogdiA9PiBoZXhhLnRlc3QodiksXG4gIGhleE9ySGV4YUNvbG9yOiB2ID0+IGhleE9ySGV4YS50ZXN0KHYpLFxuXG4gIHJnYkNvbG9yOiB2ID0+IHJnYi50ZXN0KHYpLFxuICByZ2JhQ29sb3I6IHYgPT4gcmdiYS50ZXN0KHYpLFxuICByZ2JPclJnYmFDb2xvcjogdiA9PiByZ2IudGVzdCh2KSB8fCByZ2JhLnRlc3QodiksXG5cbiAgaGV4T3JSZ2JDb2xvcjogdiA9PiBoZXgudGVzdCh2KSB8fCByZ2IudGVzdCh2KSxcbiAgaGV4YU9yUmdiYUNvbG9yOiB2ID0+IGhleGEudGVzdCh2KSB8fCByZ2JhLnRlc3QodiksXG4gIGFueUNvbG9yOiB2ID0+IGhleE9ySGV4YS50ZXN0KHYpIHx8IHJnYi50ZXN0KHYpIHx8IHJnYmEudGVzdCh2KVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRlc3RQYXR0ZXJuXG59XG4iLCJpbXBvcnQgeyByZWYsIGNvbXB1dGVkLCB3YXRjaCwgb25CZWZvcmVVbm1vdW50LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VGb3JtQ2hpbGQgZnJvbSAnLi4vdXNlLWZvcm0vdXNlLWZvcm0tY2hpbGQuanMnXG5pbXBvcnQgeyB0ZXN0UGF0dGVybiB9IGZyb20gJy4uLy4uL3V0aWxzL3BhdHRlcm5zL3BhdHRlcm5zLmpzJ1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uLy4uL3V0aWxzL2RlYm91bmNlL2RlYm91bmNlLmpzJ1xuaW1wb3J0IHsgaW5qZWN0UHJvcCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuaW5qZWN0LW9iai1wcm9wL2luamVjdC1vYmotcHJvcC5qcydcblxuY29uc3QgbGF6eVJ1bGVzVmFsdWVzID0gWyB0cnVlLCBmYWxzZSwgJ29uZGVtYW5kJyBdXG5cbmV4cG9ydCBjb25zdCB1c2VWYWxpZGF0ZVByb3BzID0ge1xuICBtb2RlbFZhbHVlOiB7fSxcblxuICBlcnJvcjoge1xuICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBlcnJvck1lc3NhZ2U6IFN0cmluZyxcbiAgbm9FcnJvckljb246IEJvb2xlYW4sXG5cbiAgcnVsZXM6IEFycmF5LFxuICByZWFjdGl2ZVJ1bGVzOiBCb29sZWFuLFxuICBsYXp5UnVsZXM6IHtcbiAgICB0eXBlOiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICAgIGRlZmF1bHQ6IGZhbHNlLCAvLyBzdGF0ZW1lbnQgdW5uZWVkZWQgYnV0IGF2b2lkcyBmdXR1cmUgdnVlIGltcGxlbWVudGF0aW9uIGNoYW5nZXNcbiAgICB2YWxpZGF0b3I6IHYgPT4gbGF6eVJ1bGVzVmFsdWVzLmluY2x1ZGVzKHYpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZvY3VzZWQsIGlubmVyTG9hZGluZykge1xuICBjb25zdCB7IHByb3BzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBpbm5lckVycm9yID0gcmVmKGZhbHNlKVxuICBjb25zdCBpbm5lckVycm9yTWVzc2FnZSA9IHJlZihudWxsKVxuICBjb25zdCBpc0RpcnR5TW9kZWwgPSByZWYoZmFsc2UpXG5cbiAgdXNlRm9ybUNoaWxkKHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiB9KVxuXG4gIGxldCB2YWxpZGF0ZUluZGV4ID0gMCwgdW53YXRjaFJ1bGVzXG5cbiAgY29uc3QgaGFzUnVsZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnJ1bGVzICE9PSB2b2lkIDBcbiAgICAmJiBwcm9wcy5ydWxlcyAhPT0gbnVsbFxuICAgICYmIHByb3BzLnJ1bGVzLmxlbmd0aCAhPT0gMFxuICApXG5cbiAgY29uc3QgY2FuRGVib3VuY2VWYWxpZGF0ZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgJiYgaGFzUnVsZXMudmFsdWUgPT09IHRydWVcbiAgICAvLyBTaG91bGQgbm90IGhhdmUgYSB2YWxpZGF0aW9uIGluIHByb2dyZXNzIGFscmVhZHk7XG4gICAgLy8gSXQgbWlnaHQgbWVhbiB0aGF0IGZvY3VzIHN3aXRjaGVkIHRvIHN1Ym1pdCBidG4gYW5kXG4gICAgLy8gUUZvcm0ncyBzdWJtaXQoKSBoYXMgYmVlbiBjYWxsZWQgYWxyZWFkeSAoRU5URVIga2V5KVxuICAgICYmIGlubmVyTG9hZGluZy52YWx1ZSA9PT0gZmFsc2VcbiAgKSlcblxuICBjb25zdCBoYXNFcnJvciA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMuZXJyb3IgPT09IHRydWUgfHwgaW5uZXJFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICApXG5cbiAgY29uc3QgZXJyb3JNZXNzYWdlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHR5cGVvZiBwcm9wcy5lcnJvck1lc3NhZ2UgPT09ICdzdHJpbmcnICYmIHByb3BzLmVycm9yTWVzc2FnZS5sZW5ndGggIT09IDBcbiAgICAgID8gcHJvcHMuZXJyb3JNZXNzYWdlXG4gICAgICA6IGlubmVyRXJyb3JNZXNzYWdlLnZhbHVlXG4gICkpXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgKCkgPT4ge1xuICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IHRydWVcblxuICAgIGlmIChcbiAgICAgIGNhbkRlYm91bmNlVmFsaWRhdGUudmFsdWUgPT09IHRydWVcbiAgICAgIC8vIHRyaWdnZXIgdmFsaWRhdGlvbiBpZiBub3QgdXNpbmcgYW55IGtpbmQgb2YgbGF6eS1ydWxlc1xuICAgICAgJiYgcHJvcHMubGF6eVJ1bGVzID09PSBmYWxzZVxuICAgICkge1xuICAgICAgZGVib3VuY2VkVmFsaWRhdGUoKVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiBvblJ1bGVzQ2hhbmdlICgpIHtcbiAgICBpZiAoXG4gICAgICBwcm9wcy5sYXp5UnVsZXMgIT09ICdvbmRlbWFuZCdcbiAgICAgICYmIGNhbkRlYm91bmNlVmFsaWRhdGUudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGlzRGlydHlNb2RlbC52YWx1ZSA9PT0gdHJ1ZVxuICAgICkge1xuICAgICAgZGVib3VuY2VkVmFsaWRhdGUoKVxuICAgIH1cbiAgfVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnJlYWN0aXZlUnVsZXMsIHZhbCA9PiB7XG4gICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHVud2F0Y2hSdWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHVud2F0Y2hSdWxlcyA9IHdhdGNoKCgpID0+IHByb3BzLnJ1bGVzLCBvblJ1bGVzQ2hhbmdlLCB7IGltbWVkaWF0ZTogdHJ1ZSwgZGVlcDogdHJ1ZSB9KVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh1bndhdGNoUnVsZXMgIT09IHZvaWQgMCkge1xuICAgICAgdW53YXRjaFJ1bGVzKClcbiAgICAgIHVud2F0Y2hSdWxlcyA9IHZvaWQgMFxuICAgIH1cbiAgfSwgeyBpbW1lZGlhdGU6IHRydWUgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5sYXp5UnVsZXMsIG9uUnVsZXNDaGFuZ2UpXG5cbiAgd2F0Y2goZm9jdXNlZCwgdmFsID0+IHtcbiAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSB0cnVlXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgY2FuRGVib3VuY2VWYWxpZGF0ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubGF6eVJ1bGVzICE9PSAnb25kZW1hbmQnXG4gICAgKSB7XG4gICAgICBkZWJvdW5jZWRWYWxpZGF0ZSgpXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIHJlc2V0VmFsaWRhdGlvbiAoKSB7XG4gICAgdmFsaWRhdGVJbmRleCsrXG4gICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gZmFsc2VcbiAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSBmYWxzZVxuICAgIGlubmVyRXJyb3IudmFsdWUgPSBmYWxzZVxuICAgIGlubmVyRXJyb3JNZXNzYWdlLnZhbHVlID0gbnVsbFxuICAgIGRlYm91bmNlZFZhbGlkYXRlLmNhbmNlbCgpXG4gIH1cblxuICAvKlxuICAgKiBSZXR1cm4gdmFsdWVcbiAgICogICAtIHRydWUgKHZhbGlkYXRpb24gc3VjY2VlZGVkKVxuICAgKiAgIC0gZmFsc2UgKHZhbGlkYXRpb24gZmFpbGVkKVxuICAgKiAgIC0gUHJvbWlzZSAocGVuZGluZyBhc3luYyB2YWxpZGF0aW9uKVxuICAgKi9cbiAgZnVuY3Rpb24gdmFsaWRhdGUgKHZhbCA9IHByb3BzLm1vZGVsVmFsdWUpIHtcbiAgICBpZiAoXG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICB8fCBoYXNSdWxlcy52YWx1ZSA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSArK3ZhbGlkYXRlSW5kZXhcblxuICAgIGNvbnN0IHNldERpcnR5ID0gaW5uZXJMb2FkaW5nLnZhbHVlICE9PSB0cnVlXG4gICAgICA/ICgpID0+IHsgaXNEaXJ0eU1vZGVsLnZhbHVlID0gdHJ1ZSB9XG4gICAgICA6ICgpID0+IHt9XG5cbiAgICBjb25zdCB1cGRhdGUgPSAoZXJyLCBtc2cpID0+IHtcbiAgICAgIGVyciA9PT0gdHJ1ZSAmJiBzZXREaXJ0eSgpXG5cbiAgICAgIGlubmVyRXJyb3IudmFsdWUgPSBlcnJcbiAgICAgIGlubmVyRXJyb3JNZXNzYWdlLnZhbHVlID0gbXNnIHx8IG51bGxcbiAgICAgIGlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5ydWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcnVsZSA9IHByb3BzLnJ1bGVzWyBpIF1cbiAgICAgIGxldCByZXNcblxuICAgICAgaWYgKHR5cGVvZiBydWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJlcyA9IHJ1bGUodmFsLCB0ZXN0UGF0dGVybilcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBydWxlID09PSAnc3RyaW5nJyAmJiB0ZXN0UGF0dGVyblsgcnVsZSBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmVzID0gdGVzdFBhdHRlcm5bIHJ1bGUgXSh2YWwpXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMgPT09IGZhbHNlIHx8IHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHVwZGF0ZSh0cnVlLCByZXMpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAocmVzICE9PSB0cnVlICYmIHJlcyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gocmVzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9taXNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHVwZGF0ZShmYWxzZSlcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gdHJ1ZVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKFxuICAgICAgcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcyA9PT0gdm9pZCAwIHx8IEFycmF5LmlzQXJyYXkocmVzKSA9PT0gZmFsc2UgfHwgcmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGluZGV4ID09PSB2YWxpZGF0ZUluZGV4ICYmIHVwZGF0ZShmYWxzZSlcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbXNnID0gcmVzLmZpbmQociA9PiByID09PSBmYWxzZSB8fCB0eXBlb2YgciA9PT0gJ3N0cmluZycpXG4gICAgICAgIGluZGV4ID09PSB2YWxpZGF0ZUluZGV4ICYmIHVwZGF0ZShtc2cgIT09IHZvaWQgMCwgbXNnKVxuICAgICAgICByZXR1cm4gbXNnID09PSB2b2lkIDBcbiAgICAgIH0sXG4gICAgICBlID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB2YWxpZGF0ZUluZGV4KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICAgIHVwZGF0ZSh0cnVlKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgY29uc3QgZGVib3VuY2VkVmFsaWRhdGUgPSBkZWJvdW5jZSh2YWxpZGF0ZSwgMClcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHVud2F0Y2hSdWxlcz8uKClcbiAgICBkZWJvdW5jZWRWYWxpZGF0ZS5jYW5jZWwoKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kcyAmIHByb3BzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHsgcmVzZXRWYWxpZGF0aW9uLCB2YWxpZGF0ZSB9KVxuICBpbmplY3RQcm9wKHByb3h5LCAnaGFzRXJyb3InLCAoKSA9PiBoYXNFcnJvci52YWx1ZSlcblxuICByZXR1cm4ge1xuICAgIGlzRGlydHlNb2RlbCxcbiAgICBoYXNSdWxlcyxcbiAgICBoYXNFcnJvcixcbiAgICBlcnJvck1lc3NhZ2UsXG5cbiAgICB2YWxpZGF0ZSxcbiAgICByZXNldFZhbGlkYXRpb25cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgVHJhbnNpdGlvbiwgbmV4dFRpY2ssIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFTcGlubmVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvc3Bpbm5lci9RU3Bpbm5lci5qcydcblxuaW1wb3J0IHVzZUlkIGZyb20gJy4uL3VzZS1pZC91c2UtaWQuanMnXG5pbXBvcnQgdXNlU3BsaXRBdHRycyBmcm9tICcuLi91c2Utc3BsaXQtYXR0cnMvdXNlLXNwbGl0LWF0dHJzLmpzJ1xuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZGFyay91c2UtZGFyay5qcydcbmltcG9ydCB1c2VWYWxpZGF0ZSwgeyB1c2VWYWxpZGF0ZVByb3BzIH0gZnJvbSAnLi4vcHJpdmF0ZS51c2UtdmFsaWRhdGUvdXNlLXZhbGlkYXRlLmpzJ1xuXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IHByZXZlbnQsIHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBhZGRGb2N1c0ZuLCByZW1vdmVGb2N1c0ZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5mb2N1cy9mb2N1cy1tYW5hZ2VyLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gZmllbGRWYWx1ZUlzRmlsbGVkICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdm9pZCAwXG4gICAgJiYgdmFsICE9PSBudWxsXG4gICAgJiYgKCcnICsgdmFsKS5sZW5ndGggIT09IDBcbn1cblxuZXhwb3J0IGNvbnN0IHVzZU5vbklucHV0RmllbGRQcm9wcyA9IHtcbiAgLi4udXNlRGFya1Byb3BzLFxuICAuLi51c2VWYWxpZGF0ZVByb3BzLFxuXG4gIGxhYmVsOiBTdHJpbmcsXG4gIHN0YWNrTGFiZWw6IEJvb2xlYW4sXG4gIGhpbnQ6IFN0cmluZyxcbiAgaGlkZUhpbnQ6IEJvb2xlYW4sXG4gIHByZWZpeDogU3RyaW5nLFxuICBzdWZmaXg6IFN0cmluZyxcblxuICBsYWJlbENvbG9yOiBTdHJpbmcsXG4gIGNvbG9yOiBTdHJpbmcsXG4gIGJnQ29sb3I6IFN0cmluZyxcblxuICBmaWxsZWQ6IEJvb2xlYW4sXG4gIG91dGxpbmVkOiBCb29sZWFuLFxuICBib3JkZXJsZXNzOiBCb29sZWFuLFxuICBzdGFuZG91dDogWyBCb29sZWFuLCBTdHJpbmcgXSxcblxuICBzcXVhcmU6IEJvb2xlYW4sXG5cbiAgbG9hZGluZzogQm9vbGVhbixcblxuICBsYWJlbFNsb3Q6IEJvb2xlYW4sXG5cbiAgYm90dG9tU2xvdHM6IEJvb2xlYW4sXG4gIGhpZGVCb3R0b21TcGFjZTogQm9vbGVhbixcblxuICByb3VuZGVkOiBCb29sZWFuLFxuICBkZW5zZTogQm9vbGVhbixcbiAgaXRlbUFsaWduZWQ6IEJvb2xlYW4sXG5cbiAgY291bnRlcjogQm9vbGVhbixcblxuICBjbGVhcmFibGU6IEJvb2xlYW4sXG4gIGNsZWFySWNvbjogU3RyaW5nLFxuXG4gIGRpc2FibGU6IEJvb2xlYW4sXG4gIHJlYWRvbmx5OiBCb29sZWFuLFxuXG4gIGF1dG9mb2N1czogQm9vbGVhbixcblxuICBmb3I6IFN0cmluZ1xufVxuXG5leHBvcnQgY29uc3QgdXNlRmllbGRQcm9wcyA9IHtcbiAgLi4udXNlTm9uSW5wdXRGaWVsZFByb3BzLFxuICBtYXhsZW5ndGg6IFsgTnVtYmVyLCBTdHJpbmcgXVxufVxuXG5leHBvcnQgY29uc3QgdXNlRmllbGRFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2NsZWFyJywgJ2ZvY3VzJywgJ2JsdXInIF1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZpZWxkU3RhdGUgKHsgcmVxdWlyZWRGb3JBdHRyID0gdHJ1ZSwgdGFnUHJvcCwgY2hhbmdlRXZlbnQgPSBmYWxzZSB9ID0ge30pIHtcbiAgY29uc3QgeyBwcm9wcywgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgcHJveHkuJHEpXG4gIGNvbnN0IHRhcmdldFVpZCA9IHVzZUlkKHtcbiAgICByZXF1aXJlZDogcmVxdWlyZWRGb3JBdHRyLFxuICAgIGdldFZhbHVlOiAoKSA9PiBwcm9wcy5mb3JcbiAgfSlcblxuICByZXR1cm4ge1xuICAgIHJlcXVpcmVkRm9yQXR0cixcbiAgICBjaGFuZ2VFdmVudCxcbiAgICB0YWc6IHRhZ1Byb3AgPT09IHRydWVcbiAgICAgID8gY29tcHV0ZWQoKCkgPT4gcHJvcHMudGFnKVxuICAgICAgOiB7IHZhbHVlOiAnbGFiZWwnIH0sXG5cbiAgICBpc0RhcmssXG5cbiAgICBlZGl0YWJsZTogY29tcHV0ZWQoKCkgPT5cbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMucmVhZG9ubHkgIT09IHRydWVcbiAgICApLFxuXG4gICAgaW5uZXJMb2FkaW5nOiByZWYoZmFsc2UpLFxuICAgIGZvY3VzZWQ6IHJlZihmYWxzZSksXG4gICAgaGFzUG9wdXBPcGVuOiBmYWxzZSxcblxuICAgIHNwbGl0QXR0cnM6IHVzZVNwbGl0QXR0cnMoKSxcbiAgICB0YXJnZXRVaWQsXG5cbiAgICByb290UmVmOiByZWYobnVsbCksXG4gICAgdGFyZ2V0UmVmOiByZWYobnVsbCksXG4gICAgY29udHJvbFJlZjogcmVmKG51bGwpXG5cbiAgICAvKipcbiAgICAgKiB1c2VyIHN1cHBsaWVkIGFkZGl0aW9uYWxzOlxuXG4gICAgICogaW5uZXJWYWx1ZSAtIGNvbXB1dGVkXG4gICAgICogZmxvYXRpbmdMYWJlbCAtIGNvbXB1dGVkXG4gICAgICogaW5wdXRSZWYgLSBjb21wdXRlZFxuXG4gICAgICogZmllbGRDbGFzcyAtIGNvbXB1dGVkXG4gICAgICogaGFzU2hhZG93IC0gY29tcHV0ZWRcblxuICAgICAqIGNvbnRyb2xFdmVudHMgLSBPYmplY3Qgd2l0aCBmbihlKVxuXG4gICAgICogZ2V0Q29udHJvbCAtIGZuXG4gICAgICogZ2V0SW5uZXJBcHBlbmQgLSBmblxuICAgICAqIGdldENvbnRyb2xDaGlsZCAtIGZuXG4gICAgICogZ2V0U2hhZG93Q29udHJvbCAtIGZuXG4gICAgICogc2hvd1BvcHVwIC0gZm5cbiAgICAgKi9cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgc2xvdHMsIGF0dHJzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyAkcSB9ID0gcHJveHlcblxuICBsZXQgZm9jdXNvdXRUaW1lciA9IG51bGxcblxuICBpZiAoc3RhdGUuaGFzVmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKHByb3BzLm1vZGVsVmFsdWUpKVxuICB9XG5cbiAgaWYgKHN0YXRlLmVtaXRWYWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuZW1pdFZhbHVlID0gdmFsdWUgPT4ge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCB2YWx1ZSlcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUuY29udHJvbEV2ZW50cyA9PT0gdm9pZCAwKSB7XG4gICAgc3RhdGUuY29udHJvbEV2ZW50cyA9IHtcbiAgICAgIG9uRm9jdXNpbjogb25Db250cm9sRm9jdXNpbixcbiAgICAgIG9uRm9jdXNvdXQ6IG9uQ29udHJvbEZvY3Vzb3V0XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge1xuICAgIGNsZWFyVmFsdWUsXG4gICAgb25Db250cm9sRm9jdXNpbixcbiAgICBvbkNvbnRyb2xGb2N1c291dCxcbiAgICBmb2N1c1xuICB9KVxuXG4gIGlmIChzdGF0ZS5jb21wdXRlZENvdW50ZXIgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmNvbXB1dGVkQ291bnRlciA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5jb3VudGVyICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBsZW4gPSB0eXBlb2YgcHJvcHMubW9kZWxWYWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgICAgPyAoJycgKyBwcm9wcy5tb2RlbFZhbHVlKS5sZW5ndGhcbiAgICAgICAgICA6IChBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpID09PSB0cnVlID8gcHJvcHMubW9kZWxWYWx1ZS5sZW5ndGggOiAwKVxuXG4gICAgICAgIGNvbnN0IG1heCA9IHByb3BzLm1heGxlbmd0aCAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBwcm9wcy5tYXhsZW5ndGhcbiAgICAgICAgICA6IHByb3BzLm1heFZhbHVlc1xuXG4gICAgICAgIHJldHVybiBsZW4gKyAobWF4ICE9PSB2b2lkIDAgPyAnIC8gJyArIG1heCA6ICcnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb25zdCB7XG4gICAgaXNEaXJ0eU1vZGVsLFxuICAgIGhhc1J1bGVzLFxuICAgIGhhc0Vycm9yLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICByZXNldFZhbGlkYXRpb25cbiAgfSA9IHVzZVZhbGlkYXRlKHN0YXRlLmZvY3VzZWQsIHN0YXRlLmlubmVyTG9hZGluZylcblxuICBjb25zdCBmbG9hdGluZ0xhYmVsID0gc3RhdGUuZmxvYXRpbmdMYWJlbCAhPT0gdm9pZCAwXG4gICAgPyBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGFja0xhYmVsID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuZmxvYXRpbmdMYWJlbC52YWx1ZSA9PT0gdHJ1ZSlcbiAgICA6IGNvbXB1dGVkKCgpID0+IHByb3BzLnN0YWNrTGFiZWwgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5oYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZSlcblxuICBjb25zdCBzaG91bGRSZW5kZXJCb3R0b20gPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmJvdHRvbVNsb3RzID09PSB0cnVlXG4gICAgfHwgcHJvcHMuaGludCAhPT0gdm9pZCAwXG4gICAgfHwgaGFzUnVsZXMudmFsdWUgPT09IHRydWVcbiAgICB8fCBwcm9wcy5jb3VudGVyID09PSB0cnVlXG4gICAgfHwgcHJvcHMuZXJyb3IgIT09IG51bGxcbiAgKVxuXG4gIGNvbnN0IHN0eWxlVHlwZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAocHJvcHMuZmlsbGVkID09PSB0cnVlKSB7IHJldHVybiAnZmlsbGVkJyB9XG4gICAgaWYgKHByb3BzLm91dGxpbmVkID09PSB0cnVlKSB7IHJldHVybiAnb3V0bGluZWQnIH1cbiAgICBpZiAocHJvcHMuYm9yZGVybGVzcyA9PT0gdHJ1ZSkgeyByZXR1cm4gJ2JvcmRlcmxlc3MnIH1cbiAgICBpZiAocHJvcHMuc3RhbmRvdXQpIHsgcmV0dXJuICdzdGFuZG91dCcgfVxuICAgIHJldHVybiAnc3RhbmRhcmQnXG4gIH0pXG5cbiAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgYHEtZmllbGQgcm93IG5vLXdyYXAgaXRlbXMtc3RhcnQgcS1maWVsZC0tJHsgc3R5bGVUeXBlLnZhbHVlIH1gXG4gICAgKyAoc3RhdGUuZmllbGRDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBzdGF0ZS5maWVsZENsYXNzLnZhbHVlIH1gIDogJycpXG4gICAgKyAocHJvcHMucm91bmRlZCA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tcm91bmRlZCcgOiAnJylcbiAgICArIChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtZmllbGQtLXNxdWFyZScgOiAnJylcbiAgICArIChmbG9hdGluZ0xhYmVsLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1mbG9hdCcgOiAnJylcbiAgICArIChoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tbGFiZWxlZCcgOiAnJylcbiAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGVuc2UnIDogJycpXG4gICAgKyAocHJvcHMuaXRlbUFsaWduZWQgPT09IHRydWUgPyAnIHEtZmllbGQtLWl0ZW0tYWxpZ25lZCBxLWl0ZW0tdHlwZScgOiAnJylcbiAgICArIChzdGF0ZS5pc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWRhcmsnIDogJycpXG4gICAgKyAoc3RhdGUuZ2V0Q29udHJvbCA9PT0gdm9pZCAwID8gJyBxLWZpZWxkLS1hdXRvLWhlaWdodCcgOiAnJylcbiAgICArIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1mb2N1c2VkJyA6ICcnKVxuICAgICsgKGhhc0Vycm9yLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1lcnJvcicgOiAnJylcbiAgICArIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1oaWdobGlnaHRlZCcgOiAnJylcbiAgICArIChwcm9wcy5oaWRlQm90dG9tU3BhY2UgIT09IHRydWUgJiYgc2hvdWxkUmVuZGVyQm90dG9tLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS13aXRoLWJvdHRvbScgOiAnJylcbiAgICArIChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kaXNhYmxlZCcgOiAocHJvcHMucmVhZG9ubHkgPT09IHRydWUgPyAnIHEtZmllbGQtLXJlYWRvbmx5JyA6ICcnKSlcbiAgKVxuXG4gIGNvbnN0IGNvbnRlbnRDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3EtZmllbGRfX2NvbnRyb2wgcmVsYXRpdmUtcG9zaXRpb24gcm93IG5vLXdyYXAnXG4gICAgKyAocHJvcHMuYmdDb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy5iZ0NvbG9yIH1gIDogJycpXG4gICAgKyAoXG4gICAgICBoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICcgdGV4dC1uZWdhdGl2ZSdcbiAgICAgICAgOiAoXG4gICAgICAgICAgICB0eXBlb2YgcHJvcHMuc3RhbmRvdXQgPT09ICdzdHJpbmcnICYmIHByb3BzLnN0YW5kb3V0Lmxlbmd0aCAhPT0gMCAmJiBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gYCAkeyBwcm9wcy5zdGFuZG91dCB9YFxuICAgICAgICAgICAgICA6IChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICAgICAgKVxuICAgIClcbiAgKVxuXG4gIGNvbnN0IGhhc0xhYmVsID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5sYWJlbFNsb3QgPT09IHRydWUgfHwgcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICApXG5cbiAgY29uc3QgbGFiZWxDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3EtZmllbGRfX2xhYmVsIG5vLXBvaW50ZXItZXZlbnRzIGFic29sdXRlIGVsbGlwc2lzJ1xuICAgICsgKHByb3BzLmxhYmVsQ29sb3IgIT09IHZvaWQgMCAmJiBoYXNFcnJvci52YWx1ZSAhPT0gdHJ1ZSA/IGAgdGV4dC0keyBwcm9wcy5sYWJlbENvbG9yIH1gIDogJycpXG4gIClcblxuICBjb25zdCBjb250cm9sU2xvdFNjb3BlID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICBpZDogc3RhdGUudGFyZ2V0VWlkLnZhbHVlLFxuICAgIGVkaXRhYmxlOiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSxcbiAgICBmb2N1c2VkOiBzdGF0ZS5mb2N1c2VkLnZhbHVlLFxuICAgIGZsb2F0aW5nTGFiZWw6IGZsb2F0aW5nTGFiZWwudmFsdWUsXG4gICAgbW9kZWxWYWx1ZTogcHJvcHMubW9kZWxWYWx1ZSxcbiAgICBlbWl0VmFsdWU6IHN0YXRlLmVtaXRWYWx1ZVxuICB9KSlcblxuICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGFjYyA9IHt9XG5cbiAgICBpZiAoc3RhdGUudGFyZ2V0VWlkLnZhbHVlKSB7XG4gICAgICBhY2MuZm9yID0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIGFjY1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjXG4gIH0pXG5cbiAgZnVuY3Rpb24gZm9jdXNIYW5kbGVyICgpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBsZXQgdGFyZ2V0ID0gc3RhdGUudGFyZ2V0UmVmPy52YWx1ZVxuXG4gICAgaWYgKHRhcmdldCAmJiAoZWwgPT09IG51bGwgfHwgZWwuaWQgIT09IHN0YXRlLnRhcmdldFVpZC52YWx1ZSkpIHtcbiAgICAgIHRhcmdldC5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4JykgPT09IHRydWUgfHwgKHRhcmdldCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCdbdGFiaW5kZXhdJykpXG4gICAgICBpZiAodGFyZ2V0ICE9PSBlbCkge1xuICAgICAgICB0YXJnZXQ/LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZvY3VzICgpIHtcbiAgICBhZGRGb2N1c0ZuKGZvY3VzSGFuZGxlcilcbiAgfVxuXG4gIGZ1bmN0aW9uIGJsdXIgKCkge1xuICAgIHJlbW92ZUZvY3VzRm4oZm9jdXNIYW5kbGVyKVxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgIGlmIChlbCAhPT0gbnVsbCAmJiBzdGF0ZS5yb290UmVmLnZhbHVlLmNvbnRhaW5zKGVsKSkge1xuICAgICAgZWwuYmx1cigpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Db250cm9sRm9jdXNpbiAoZSkge1xuICAgIGlmIChmb2N1c291dFRpbWVyICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgICAgIGZvY3Vzb3V0VGltZXIgPSBudWxsXG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmVkaXRhYmxlLnZhbHVlID09PSB0cnVlICYmIHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID0gdHJ1ZVxuICAgICAgZW1pdCgnZm9jdXMnLCBlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29udHJvbEZvY3Vzb3V0IChlLCB0aGVuKSB7XG4gICAgZm9jdXNvdXRUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgICBmb2N1c291dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBmb2N1c291dFRpbWVyID0gbnVsbFxuXG4gICAgICBpZiAoXG4gICAgICAgIGRvY3VtZW50Lmhhc0ZvY3VzKCkgPT09IHRydWUgJiYgKFxuICAgICAgICAgIHN0YXRlLmhhc1BvcHVwT3BlbiA9PT0gdHJ1ZVxuICAgICAgICAgIHx8IHN0YXRlLmNvbnRyb2xSZWYgPT09IHZvaWQgMFxuICAgICAgICAgIHx8IHN0YXRlLmNvbnRyb2xSZWYudmFsdWUgPT09IG51bGxcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmLnZhbHVlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICE9PSBmYWxzZVxuICAgICAgICApXG4gICAgICApIHJldHVyblxuXG4gICAgICBpZiAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdGF0ZS5mb2N1c2VkLnZhbHVlID0gZmFsc2VcbiAgICAgICAgZW1pdCgnYmx1cicsIGUpXG4gICAgICB9XG5cbiAgICAgIHRoZW4/LigpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyVmFsdWUgKGUpIHtcbiAgICAvLyBwcmV2ZW50IGFjdGl2YXRpbmcgdGhlIGZpZWxkIGJ1dCBrZWVwIGZvY3VzIG9uIGRlc2t0b3BcbiAgICBzdG9wQW5kUHJldmVudChlKVxuXG4gICAgaWYgKCRxLnBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSkge1xuICAgICAgY29uc3QgZWwgPSBzdGF0ZS50YXJnZXRSZWY/LnZhbHVlIHx8IHN0YXRlLnJvb3RSZWYudmFsdWVcbiAgICAgIGVsLmZvY3VzKClcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhdGUucm9vdFJlZi52YWx1ZS5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZSkge1xuICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgICB9XG5cbiAgICBpZiAocHJvcHMudHlwZSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAvLyBkbyBub3QgbGV0IGZvY3VzIGJlIHRyaWdnZXJlZFxuICAgICAgLy8gYXMgaXQgd2lsbCBtYWtlIHRoZSBuYXRpdmUgZmlsZSBkaWFsb2dcbiAgICAgIC8vIGFwcGVhciBmb3IgYW5vdGhlciBzZWxlY3Rpb25cbiAgICAgIHN0YXRlLmlucHV0UmVmLnZhbHVlLnZhbHVlID0gbnVsbFxuICAgIH1cblxuICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbClcbiAgICBzdGF0ZS5jaGFuZ2VFdmVudCA9PT0gdHJ1ZSAmJiBlbWl0KCdjaGFuZ2UnLCBudWxsKVxuICAgIGVtaXQoJ2NsZWFyJywgcHJvcHMubW9kZWxWYWx1ZSlcblxuICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgIGNvbnN0IGlzRGlydHkgPSBpc0RpcnR5TW9kZWwudmFsdWVcbiAgICAgIHJlc2V0VmFsaWRhdGlvbigpXG4gICAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSBpc0RpcnR5XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ2xlYXJhYmxlS2V5dXAgKGV2dCkge1xuICAgIFsgMTMsIDMyIF0uaW5jbHVkZXMoZXZ0LmtleUNvZGUpICYmIGNsZWFyVmFsdWUoZXZ0KVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgY29uc3Qgbm9kZSA9IFtdXG5cbiAgICBzbG90cy5wcmVwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX3ByZXBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAga2V5OiAncHJlcGVuZCcsXG4gICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgIH0sIHNsb3RzLnByZXBlbmQoKSlcbiAgICApXG5cbiAgICBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fY29udHJvbC1jb250YWluZXIgY29sIHJlbGF0aXZlLXBvc2l0aW9uIHJvdyBuby13cmFwIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgfSwgZ2V0Q29udHJvbENvbnRhaW5lcigpKVxuICAgIClcblxuICAgIGhhc0Vycm9yLnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vRXJyb3JJY29uID09PSBmYWxzZSAmJiBub2RlLnB1c2goXG4gICAgICBnZXRJbm5lckFwcGVuZE5vZGUoJ2Vycm9yJywgW1xuICAgICAgICBoKFFJY29uLCB7IG5hbWU6ICRxLmljb25TZXQuZmllbGQuZXJyb3IsIGNvbG9yOiAnbmVnYXRpdmUnIH0pXG4gICAgICBdKVxuICAgIClcblxuICAgIGlmIChwcm9wcy5sb2FkaW5nID09PSB0cnVlIHx8IHN0YXRlLmlubmVyTG9hZGluZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBnZXRJbm5lckFwcGVuZE5vZGUoXG4gICAgICAgICAgJ2lubmVyLWxvYWRpbmctYXBwZW5kJyxcbiAgICAgICAgICBzbG90cy5sb2FkaW5nICE9PSB2b2lkIDBcbiAgICAgICAgICAgID8gc2xvdHMubG9hZGluZygpXG4gICAgICAgICAgICA6IFsgaChRU3Bpbm5lciwgeyBjb2xvcjogcHJvcHMuY29sb3IgfSkgXVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLmNsZWFyYWJsZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5oYXNWYWx1ZS52YWx1ZSA9PT0gdHJ1ZSAmJiBzdGF0ZS5lZGl0YWJsZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBnZXRJbm5lckFwcGVuZE5vZGUoJ2lubmVyLWNsZWFyYWJsZS1hcHBlbmQnLCBbXG4gICAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19mb2N1c2FibGUtYWN0aW9uJyxcbiAgICAgICAgICAgIG5hbWU6IHByb3BzLmNsZWFySWNvbiB8fCAkcS5pY29uU2V0LmZpZWxkLmNsZWFyLFxuICAgICAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICAgICByb2xlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICdmYWxzZScsXG4gICAgICAgICAgICAnYXJpYS1sYWJlbCc6ICRxLmxhbmcubGFiZWwuY2xlYXIsXG4gICAgICAgICAgICBvbktleXVwOiBvbkNsZWFyYWJsZUtleXVwLFxuICAgICAgICAgICAgb25DbGljazogY2xlYXJWYWx1ZVxuICAgICAgICAgIH0pXG4gICAgICAgIF0pXG4gICAgICApXG4gICAgfVxuXG4gICAgc2xvdHMuYXBwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FwcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICBrZXk6ICdhcHBlbmQnLFxuICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICB9LCBzbG90cy5hcHBlbmQoKSlcbiAgICApXG5cbiAgICBzdGF0ZS5nZXRJbm5lckFwcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGdldElubmVyQXBwZW5kTm9kZSgnaW5uZXItYXBwZW5kJywgc3RhdGUuZ2V0SW5uZXJBcHBlbmQoKSlcbiAgICApXG5cbiAgICBzdGF0ZS5nZXRDb250cm9sQ2hpbGQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBzdGF0ZS5nZXRDb250cm9sQ2hpbGQoKVxuICAgIClcblxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250cm9sQ29udGFpbmVyICgpIHtcbiAgICBjb25zdCBub2RlID0gW11cblxuICAgIHByb3BzLnByZWZpeCAhPT0gdm9pZCAwICYmIHByb3BzLnByZWZpeCAhPT0gbnVsbCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fcHJlZml4IG5vLXBvaW50ZXItZXZlbnRzIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBwcm9wcy5wcmVmaXgpXG4gICAgKVxuXG4gICAgaWYgKHN0YXRlLmdldFNoYWRvd0NvbnRyb2wgIT09IHZvaWQgMCAmJiBzdGF0ZS5oYXNTaGFkb3cudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgc3RhdGUuZ2V0U2hhZG93Q29udHJvbCgpXG4gICAgICApXG4gICAgfVxuXG4gICAgaGFzTGFiZWwudmFsdWUgPT09IHRydWUgJiYgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogbGFiZWxDbGFzcy52YWx1ZVxuICAgICAgfSwgaFNsb3Qoc2xvdHMubGFiZWwsIHByb3BzLmxhYmVsKSlcbiAgICApXG5cbiAgICBpZiAoc3RhdGUuZ2V0Q29udHJvbCAhPT0gdm9pZCAwKSB7XG4gICAgICBub2RlLnB1c2goc3RhdGUuZ2V0Q29udHJvbCgpKVxuICAgIH1cbiAgICAvLyBpbnRlcm5hbCB1c2FnZSBvbmx5OlxuICAgIGVsc2UgaWYgKHNsb3RzLnJhd0NvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKHNsb3RzLnJhd0NvbnRyb2woKSlcbiAgICB9XG4gICAgZWxzZSBpZiAoc2xvdHMuY29udHJvbCAhPT0gdm9pZCAwKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHN0YXRlLnRhcmdldFJlZixcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX25hdGl2ZSByb3cnLFxuICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMFxuICAgICAgICB9LCBzbG90cy5jb250cm9sKGNvbnRyb2xTbG90U2NvcGUudmFsdWUpKVxuICAgICAgKVxuICAgIH1cblxuICAgIHByb3BzLnN1ZmZpeCAhPT0gdm9pZCAwICYmIHByb3BzLnN1ZmZpeCAhPT0gbnVsbCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fc3VmZml4IG5vLXBvaW50ZXItZXZlbnRzIHJvdyBpdGVtcy1jZW50ZXInXG4gICAgICB9LCBwcm9wcy5zdWZmaXgpXG4gICAgKVxuXG4gICAgcmV0dXJuIG5vZGUuY29uY2F0KGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm90dG9tICgpIHtcbiAgICBsZXQgbXNnLCBrZXlcblxuICAgIGlmIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGVycm9yTWVzc2FnZS52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICBtc2cgPSBbIGgoJ2RpdicsIHsgcm9sZTogJ2FsZXJ0JyB9LCBlcnJvck1lc3NhZ2UudmFsdWUpIF1cbiAgICAgICAga2V5ID0gYHEtLXNsb3QtZXJyb3ItJHsgZXJyb3JNZXNzYWdlLnZhbHVlIH1gXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbXNnID0gaFNsb3Qoc2xvdHMuZXJyb3IpXG4gICAgICAgIGtleSA9ICdxLS1zbG90LWVycm9yJ1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5oaWRlSGludCAhPT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAocHJvcHMuaGludCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG1zZyA9IFsgaCgnZGl2JywgcHJvcHMuaGludCkgXVxuICAgICAgICBrZXkgPSBgcS0tc2xvdC1oaW50LSR7IHByb3BzLmhpbnQgfWBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBtc2cgPSBoU2xvdChzbG90cy5oaW50KVxuICAgICAgICBrZXkgPSAncS0tc2xvdC1oaW50J1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGhhc0NvdW50ZXIgPSBwcm9wcy5jb3VudGVyID09PSB0cnVlIHx8IHNsb3RzLmNvdW50ZXIgIT09IHZvaWQgMFxuXG4gICAgaWYgKFxuICAgICAgcHJvcHMuaGlkZUJvdHRvbVNwYWNlID09PSB0cnVlXG4gICAgICAmJiBoYXNDb3VudGVyID09PSBmYWxzZVxuICAgICAgJiYgbXNnID09PSB2b2lkIDBcbiAgICApIHJldHVyblxuXG4gICAgY29uc3QgbWFpbiA9IGgoJ2RpdicsIHtcbiAgICAgIGtleSxcbiAgICAgIGNsYXNzOiAncS1maWVsZF9fbWVzc2FnZXMgY29sJ1xuICAgIH0sIG1zZylcblxuICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3EtZmllbGRfX2JvdHRvbSByb3cgaXRlbXMtc3RhcnQgcS1maWVsZF9fYm90dG9tLS0nXG4gICAgICAgICsgKHByb3BzLmhpZGVCb3R0b21TcGFjZSAhPT0gdHJ1ZSA/ICdhbmltYXRlZCcgOiAnc3RhbGUnKSxcbiAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICB9LCBbXG4gICAgICBwcm9wcy5oaWRlQm90dG9tU3BhY2UgPT09IHRydWVcbiAgICAgICAgPyBtYWluXG4gICAgICAgIDogaChUcmFuc2l0aW9uLCB7IG5hbWU6ICdxLXRyYW5zaXRpb24tLWZpZWxkLW1lc3NhZ2UnIH0sICgpID0+IG1haW4pLFxuXG4gICAgICBoYXNDb3VudGVyID09PSB0cnVlXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fY291bnRlcidcbiAgICAgICAgfSwgc2xvdHMuY291bnRlciAhPT0gdm9pZCAwID8gc2xvdHMuY291bnRlcigpIDogc3RhdGUuY29tcHV0ZWRDb3VudGVyLnZhbHVlKVxuICAgICAgICA6IG51bGxcbiAgICBdKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW5uZXJBcHBlbmROb2RlIChrZXksIGNvbnRlbnQpIHtcbiAgICByZXR1cm4gY29udGVudCA9PT0gbnVsbFxuICAgICAgPyBudWxsXG4gICAgICA6IGgoJ2RpdicsIHtcbiAgICAgICAga2V5LFxuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FwcGVuZCBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgcS1hbmNob3ItLXNraXAnXG4gICAgICB9LCBjb250ZW50KVxuICB9XG5cbiAgbGV0IHNob3VsZEFjdGl2YXRlID0gZmFsc2VcblxuICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICBzaG91bGRBY3RpdmF0ZSA9IHRydWVcbiAgfSlcblxuICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPT09IHRydWUgJiYgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3h5LmZvY3VzKClcbiAgfSlcblxuICBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgb25Nb3VudGVkKCgpID0+IHtcbiAgICBwcm94eS5mb2N1cygpXG4gIH0pXG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICBmb2N1c291dFRpbWVyICE9PSBudWxsICYmIGNsZWFyVGltZW91dChmb2N1c291dFRpbWVyKVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7IGZvY3VzLCBibHVyIH0pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbmRlckZpZWxkICgpIHtcbiAgICBjb25zdCBsYWJlbEF0dHJzID0gc3RhdGUuZ2V0Q29udHJvbCA9PT0gdm9pZCAwICYmIHNsb3RzLmNvbnRyb2wgPT09IHZvaWQgMFxuICAgICAgPyB7XG4gICAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDAsXG4gICAgICAgICAgLi4uYXR0cmlidXRlcy52YWx1ZVxuICAgICAgICB9XG4gICAgICA6IGF0dHJpYnV0ZXMudmFsdWVcblxuICAgIHJldHVybiBoKHN0YXRlLnRhZy52YWx1ZSwge1xuICAgICAgcmVmOiBzdGF0ZS5yb290UmVmLFxuICAgICAgY2xhc3M6IFtcbiAgICAgICAgY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgIF0sXG4gICAgICBzdHlsZTogYXR0cnMuc3R5bGUsXG4gICAgICAuLi5sYWJlbEF0dHJzXG4gICAgfSwgW1xuICAgICAgc2xvdHMuYmVmb3JlICE9PSB2b2lkIDBcbiAgICAgICAgPyBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19iZWZvcmUgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICAgIH0sIHNsb3RzLmJlZm9yZSgpKVxuICAgICAgICA6IG51bGwsXG5cbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19pbm5lciByZWxhdGl2ZS1wb3NpdGlvbiBjb2wgc2VsZi1zdHJldGNoJ1xuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBzdGF0ZS5jb250cm9sUmVmLFxuICAgICAgICAgIGNsYXNzOiBjb250ZW50Q2xhc3MudmFsdWUsXG4gICAgICAgICAgdGFiaW5kZXg6IC0xLFxuICAgICAgICAgIC4uLnN0YXRlLmNvbnRyb2xFdmVudHNcbiAgICAgICAgfSwgZ2V0Q29udGVudCgpKSxcblxuICAgICAgICBzaG91bGRSZW5kZXJCb3R0b20udmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/IGdldEJvdHRvbSgpXG4gICAgICAgICAgOiBudWxsXG4gICAgICBdKSxcblxuICAgICAgc2xvdHMuYWZ0ZXIgIT09IHZvaWQgMFxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2FmdGVyIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgICAgb25DbGljazogcHJldmVudFxuICAgICAgICB9LCBzbG90cy5hZnRlcigpKVxuICAgICAgICA6IG51bGxcbiAgICBdKVxuICB9XG59XG4iLCJpbXBvcnQgeyByZWYsIGNvbXB1dGVkLCB3YXRjaCwgbmV4dFRpY2sgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHNob3VsZElnbm9yZUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUua2V5Ym9hcmQva2V5LWNvbXBvc2l0aW9uLmpzJ1xuXG4vLyBsZWF2ZSBOQU1FRF9NQVNLUyBhdCB0b3Agb2YgZmlsZSAoY29kZSByZWZlcmVuY2VkIGZyb20gZG9jcylcbmNvbnN0IE5BTUVEX01BU0tTID0ge1xuICBkYXRlOiAnIyMjIy8jIy8jIycsXG4gIGRhdGV0aW1lOiAnIyMjIy8jIy8jIyAjIzojIycsXG4gIHRpbWU6ICcjIzojIycsXG4gIGZ1bGx0aW1lOiAnIyM6IyM6IyMnLFxuICBwaG9uZTogJygjIyMpICMjIyAtICMjIyMnLFxuICBjYXJkOiAnIyMjIyAjIyMjICMjIyMgIyMjIydcbn1cblxuY29uc3QgeyB0b2tlbk1hcDogREVGQVVMVF9UT0tFTl9NQVAsIHRva2VuS2V5czogREVGQVVMVF9UT0tFTl9NQVBfS0VZUyB9ID0gZ2V0VG9rZW5NYXAoe1xuICAnIyc6IHsgcGF0dGVybjogJ1tcXFxcZF0nLCBuZWdhdGU6ICdbXlxcXFxkXScgfSxcblxuICBTOiB7IHBhdHRlcm46ICdbYS16QS1aXScsIG5lZ2F0ZTogJ1teYS16QS1aXScgfSxcbiAgTjogeyBwYXR0ZXJuOiAnWzAtOWEtekEtWl0nLCBuZWdhdGU6ICdbXjAtOWEtekEtWl0nIH0sXG5cbiAgQTogeyBwYXR0ZXJuOiAnW2EtekEtWl0nLCBuZWdhdGU6ICdbXmEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZVVwcGVyQ2FzZSgpIH0sXG4gIGE6IHsgcGF0dGVybjogJ1thLXpBLVpdJywgbmVnYXRlOiAnW15hLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVMb3dlckNhc2UoKSB9LFxuXG4gIFg6IHsgcGF0dGVybjogJ1swLTlhLXpBLVpdJywgbmVnYXRlOiAnW14wLTlhLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVVcHBlckNhc2UoKSB9LFxuICB4OiB7IHBhdHRlcm46ICdbMC05YS16QS1aXScsIG5lZ2F0ZTogJ1teMC05YS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlTG93ZXJDYXNlKCkgfVxufSlcblxuZnVuY3Rpb24gZ2V0VG9rZW5NYXAgKHRva2Vucykge1xuICBjb25zdCB0b2tlbktleXMgPSBPYmplY3Qua2V5cyh0b2tlbnMpXG4gIGNvbnN0IHRva2VuTWFwID0ge31cblxuICB0b2tlbktleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGNvbnN0IGVudHJ5ID0gdG9rZW5zWyBrZXkgXVxuICAgIHRva2VuTWFwWyBrZXkgXSA9IHtcbiAgICAgIC4uLmVudHJ5LFxuICAgICAgcmVnZXg6IG5ldyBSZWdFeHAoZW50cnkucGF0dGVybilcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHsgdG9rZW5NYXAsIHRva2VuS2V5cyB9XG59XG5cbmZ1bmN0aW9uIGdldFRva2VuUmVnZXhNYXNrIChrZXlzKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdcXFxcXFxcXChbXi4qKz9eJHt9KCl8KFtcXFxcXV0pfChbLiorP14ke30oKXxbXFxcXF1dKXwoWycgKyBrZXlzLmpvaW4oJycpICsgJ10pfCguKScsICdnJylcbn1cblxuY29uc3QgZXNjUmVnZXggPSAvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2dcbmNvbnN0IERFRkFVTFRfVE9LRU5fUkVHRVhfTUFTSyA9IGdldFRva2VuUmVnZXhNYXNrKERFRkFVTFRfVE9LRU5fTUFQX0tFWVMpXG5jb25zdCBNQVJLRVIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDEpXG5cbmV4cG9ydCBjb25zdCB1c2VNYXNrUHJvcHMgPSB7XG4gIG1hc2s6IFN0cmluZyxcbiAgcmV2ZXJzZUZpbGxNYXNrOiBCb29sZWFuLFxuICBmaWxsTWFzazogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgdW5tYXNrZWRWYWx1ZTogQm9vbGVhbixcbiAgbWFza1Rva2VuczogT2JqZWN0XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgZW1pdCwgZW1pdFZhbHVlLCBpbnB1dFJlZikge1xuICBsZXQgbWFza01hcmtlZCwgbWFza1JlcGxhY2VkLCBjb21wdXRlZE1hc2ssIGNvbXB1dGVkVW5tYXNrLCBwYXN0ZWRUZXh0U3RhcnQsIHNlbGVjdGlvbkFuY2hvclxuXG4gIGNvbnN0IHRva2VucyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAocHJvcHMubWFza1Rva2VucyA9PT0gdm9pZCAwIHx8IHByb3BzLm1hc2tUb2tlbnMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuTWFwOiBERUZBVUxUX1RPS0VOX01BUCxcbiAgICAgICAgdG9rZW5SZWdleE1hc2s6IERFRkFVTFRfVE9LRU5fUkVHRVhfTUFTS1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgdG9rZW5NYXA6IGN1c3RvbVRva2VucyB9ID0gZ2V0VG9rZW5NYXAocHJvcHMubWFza1Rva2VucylcbiAgICBjb25zdCB0b2tlbk1hcCA9IHtcbiAgICAgIC4uLkRFRkFVTFRfVE9LRU5fTUFQLFxuICAgICAgLi4uY3VzdG9tVG9rZW5zXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuTWFwLFxuICAgICAgdG9rZW5SZWdleE1hc2s6IGdldFRva2VuUmVnZXhNYXNrKE9iamVjdC5rZXlzKHRva2VuTWFwKSlcbiAgICB9XG4gIH0pXG5cbiAgY29uc3QgaGFzTWFzayA9IHJlZihudWxsKVxuICBjb25zdCBpbm5lclZhbHVlID0gcmVmKGdldEluaXRpYWxNYXNrZWRWYWx1ZSgpKVxuXG4gIGZ1bmN0aW9uIGdldElzVHlwZVRleHQgKCkge1xuICAgIHJldHVybiBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZVxuICAgICAgfHwgWyAndGV4dGFyZWEnLCAndGV4dCcsICdzZWFyY2gnLCAndXJsJywgJ3RlbCcsICdwYXNzd29yZCcgXS5pbmNsdWRlcyhwcm9wcy50eXBlKVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudHlwZSArIHByb3BzLmF1dG9ncm93LCB1cGRhdGVNYXNrSW50ZXJuYWxzKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1hc2ssIHYgPT4ge1xuICAgIGlmICh2ICE9PSB2b2lkIDApIHtcbiAgICAgIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlLCB0cnVlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbCA9IHVubWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUpXG4gICAgICB1cGRhdGVNYXNrSW50ZXJuYWxzKClcbiAgICAgIHByb3BzLm1vZGVsVmFsdWUgIT09IHZhbCAmJiBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbClcbiAgICB9XG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMuZmlsbE1hc2sgKyBwcm9wcy5yZXZlcnNlRmlsbE1hc2ssICgpID0+IHtcbiAgICBoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlLCB0cnVlKVxuICB9KVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLnVubWFza2VkVmFsdWUsICgpID0+IHtcbiAgICBoYXNNYXNrLnZhbHVlID09PSB0cnVlICYmIHVwZGF0ZU1hc2tWYWx1ZShpbm5lclZhbHVlLnZhbHVlKVxuICB9KVxuXG4gIGZ1bmN0aW9uIGdldEluaXRpYWxNYXNrZWRWYWx1ZSAoKSB7XG4gICAgdXBkYXRlTWFza0ludGVybmFscygpXG5cbiAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgbWFza2VkID0gbWFza1ZhbHVlKHVubWFza1ZhbHVlKHByb3BzLm1vZGVsVmFsdWUpKVxuXG4gICAgICByZXR1cm4gcHJvcHMuZmlsbE1hc2sgIT09IGZhbHNlXG4gICAgICAgID8gZmlsbFdpdGhNYXNrKG1hc2tlZClcbiAgICAgICAgOiBtYXNrZWRcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMubW9kZWxWYWx1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFkZGVkTWFza01hcmtlZCAoc2l6ZSkge1xuICAgIGlmIChzaXplIDwgbWFza01hcmtlZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBtYXNrTWFya2VkLnNsaWNlKC1zaXplKVxuICAgIH1cblxuICAgIGxldCBwYWQgPSAnJywgbG9jYWxNYXNrTWFya2VkID0gbWFza01hcmtlZFxuICAgIGNvbnN0IHBhZFBvcyA9IGxvY2FsTWFza01hcmtlZC5pbmRleE9mKE1BUktFUilcblxuICAgIGlmIChwYWRQb3MgIT09IC0xKSB7XG4gICAgICBmb3IgKGxldCBpID0gc2l6ZSAtIGxvY2FsTWFza01hcmtlZC5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgcGFkICs9IE1BUktFUlxuICAgICAgfVxuXG4gICAgICBsb2NhbE1hc2tNYXJrZWQgPSBsb2NhbE1hc2tNYXJrZWQuc2xpY2UoMCwgcGFkUG9zKSArIHBhZCArIGxvY2FsTWFza01hcmtlZC5zbGljZShwYWRQb3MpXG4gICAgfVxuXG4gICAgcmV0dXJuIGxvY2FsTWFza01hcmtlZFxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTWFza0ludGVybmFscyAoKSB7XG4gICAgaGFzTWFzay52YWx1ZSA9IHByb3BzLm1hc2sgIT09IHZvaWQgMFxuICAgICAgJiYgcHJvcHMubWFzay5sZW5ndGggIT09IDBcbiAgICAgICYmIGdldElzVHlwZVRleHQoKVxuXG4gICAgaWYgKGhhc01hc2sudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBjb21wdXRlZFVubWFzayA9IHZvaWQgMFxuICAgICAgbWFza01hcmtlZCA9ICcnXG4gICAgICBtYXNrUmVwbGFjZWQgPSAnJ1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3RcbiAgICAgIGxvY2FsQ29tcHV0ZWRNYXNrID0gTkFNRURfTUFTS1NbIHByb3BzLm1hc2sgXSA9PT0gdm9pZCAwXG4gICAgICAgID8gcHJvcHMubWFza1xuICAgICAgICA6IE5BTUVEX01BU0tTWyBwcm9wcy5tYXNrIF0sXG4gICAgICBmaWxsQ2hhciA9IHR5cGVvZiBwcm9wcy5maWxsTWFzayA9PT0gJ3N0cmluZycgJiYgcHJvcHMuZmlsbE1hc2subGVuZ3RoICE9PSAwXG4gICAgICAgID8gcHJvcHMuZmlsbE1hc2suc2xpY2UoMCwgMSlcbiAgICAgICAgOiAnXycsXG4gICAgICBmaWxsQ2hhckVzY2FwZWQgPSBmaWxsQ2hhci5yZXBsYWNlKGVzY1JlZ2V4LCAnXFxcXCQmJyksXG4gICAgICB1bm1hc2sgPSBbXSxcbiAgICAgIGV4dHJhY3QgPSBbXSxcbiAgICAgIG1hc2sgPSBbXVxuXG4gICAgbGV0XG4gICAgICBmaXJzdE1hdGNoID0gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlLFxuICAgICAgdW5tYXNrQ2hhciA9ICcnLFxuICAgICAgbmVnYXRlQ2hhciA9ICcnXG5cbiAgICBsb2NhbENvbXB1dGVkTWFzay5yZXBsYWNlKHRva2Vucy52YWx1ZS50b2tlblJlZ2V4TWFzaywgKF8sIGNoYXIxLCBlc2MsIHRva2VuLCBjaGFyMikgPT4ge1xuICAgICAgaWYgKHRva2VuICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgYyA9IHRva2Vucy52YWx1ZS50b2tlbk1hcFsgdG9rZW4gXVxuICAgICAgICBtYXNrLnB1c2goYylcbiAgICAgICAgbmVnYXRlQ2hhciA9IGMubmVnYXRlXG4gICAgICAgIGlmIChmaXJzdE1hdGNoID09PSB0cnVlKSB7XG4gICAgICAgICAgZXh0cmFjdC5wdXNoKCcoPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcrKT8oPzonICsgbmVnYXRlQ2hhciArICcrKT8oJyArIGMucGF0dGVybiArICcrKT8nKVxuICAgICAgICAgIGZpcnN0TWF0Y2ggPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGV4dHJhY3QucHVzaCgnKD86JyArIG5lZ2F0ZUNoYXIgKyAnKyk/KCcgKyBjLnBhdHRlcm4gKyAnKT8nKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZXNjICE9PSB2b2lkIDApIHtcbiAgICAgICAgdW5tYXNrQ2hhciA9ICdcXFxcJyArIChlc2MgPT09ICdcXFxcJyA/ICcnIDogZXNjKVxuICAgICAgICBtYXNrLnB1c2goZXNjKVxuICAgICAgICB1bm1hc2sucHVzaCgnKFteJyArIHVubWFza0NoYXIgKyAnXSspPycgKyB1bm1hc2tDaGFyICsgJz8nKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGMgPSBjaGFyMSAhPT0gdm9pZCAwID8gY2hhcjEgOiBjaGFyMlxuICAgICAgICB1bm1hc2tDaGFyID0gYyA9PT0gJ1xcXFwnID8gJ1xcXFxcXFxcXFxcXFxcXFwnIDogYy5yZXBsYWNlKGVzY1JlZ2V4LCAnXFxcXFxcXFwkJicpXG4gICAgICAgIG1hc2sucHVzaChjKVxuICAgICAgICB1bm1hc2sucHVzaCgnKFteJyArIHVubWFza0NoYXIgKyAnXSspPycgKyB1bm1hc2tDaGFyICsgJz8nKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdFxuICAgICAgdW5tYXNrTWF0Y2hlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICdeJ1xuICAgICAgICArIHVubWFzay5qb2luKCcnKVxuICAgICAgICArICcoJyArICh1bm1hc2tDaGFyID09PSAnJyA/ICcuJyA6ICdbXicgKyB1bm1hc2tDaGFyICsgJ10nKSArICcrKT8nXG4gICAgICAgICsgKHVubWFza0NoYXIgPT09ICcnID8gJycgOiAnWycgKyB1bm1hc2tDaGFyICsgJ10qJykgKyAnJCdcbiAgICAgICksXG4gICAgICBleHRyYWN0TGFzdCA9IGV4dHJhY3QubGVuZ3RoIC0gMSxcbiAgICAgIGV4dHJhY3RNYXRjaGVyID0gZXh0cmFjdC5tYXAoKHJlLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IDAgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgZmlsbENoYXJFc2NhcGVkICsgJyonICsgcmUpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IGV4dHJhY3RMYXN0KSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAnXicgKyByZVxuICAgICAgICAgICAgKyAnKCcgKyAobmVnYXRlQ2hhciA9PT0gJycgPyAnLicgOiBuZWdhdGVDaGFyKSArICcrKT8nXG4gICAgICAgICAgICArIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgPyAnJCcgOiBmaWxsQ2hhckVzY2FwZWQgKyAnKicpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJ14nICsgcmUpXG4gICAgICB9KVxuXG4gICAgY29tcHV0ZWRNYXNrID0gbWFza1xuICAgIGNvbXB1dGVkVW5tYXNrID0gdmFsID0+IHtcbiAgICAgIGNvbnN0IHVubWFza01hdGNoID0gdW5tYXNrTWF0Y2hlci5leGVjKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/IHZhbCA6IHZhbC5zbGljZSgwLCBtYXNrLmxlbmd0aCArIDEpKVxuICAgICAgaWYgKHVubWFza01hdGNoICE9PSBudWxsKSB7XG4gICAgICAgIHZhbCA9IHVubWFza01hdGNoLnNsaWNlKDEpLmpvaW4oJycpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIGV4dHJhY3RNYXRjaCA9IFtdLFxuICAgICAgICBleHRyYWN0TWF0Y2hlckxlbmd0aCA9IGV4dHJhY3RNYXRjaGVyLmxlbmd0aFxuXG4gICAgICBmb3IgKGxldCBpID0gMCwgc3RyID0gdmFsOyBpIDwgZXh0cmFjdE1hdGNoZXJMZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtID0gZXh0cmFjdE1hdGNoZXJbIGkgXS5leGVjKHN0cilcblxuICAgICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICBzdHIgPSBzdHIuc2xpY2UobS5zaGlmdCgpLmxlbmd0aClcbiAgICAgICAgZXh0cmFjdE1hdGNoLnB1c2goLi4ubSlcbiAgICAgIH1cbiAgICAgIGlmIChleHRyYWN0TWF0Y2gubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBleHRyYWN0TWF0Y2guam9pbignJylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbFxuICAgIH1cbiAgICBtYXNrTWFya2VkID0gbWFzay5tYXAodiA9PiAodHlwZW9mIHYgPT09ICdzdHJpbmcnID8gdiA6IE1BUktFUikpLmpvaW4oJycpXG4gICAgbWFza1JlcGxhY2VkID0gbWFza01hcmtlZC5zcGxpdChNQVJLRVIpLmpvaW4oZmlsbENoYXIpXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYXNrVmFsdWUgKHJhd1ZhbCwgdXBkYXRlTWFza0ludGVybmFsc0ZsYWcsIGlucHV0VHlwZSkge1xuICAgIGNvbnN0XG4gICAgICBpbnAgPSBpbnB1dFJlZi52YWx1ZSxcbiAgICAgIGVuZCA9IGlucC5zZWxlY3Rpb25FbmQsXG4gICAgICBlbmRSZXZlcnNlID0gaW5wLnZhbHVlLmxlbmd0aCAtIGVuZCxcbiAgICAgIHVubWFza2VkID0gdW5tYXNrVmFsdWUocmF3VmFsKVxuXG4gICAgLy8gVXBkYXRlIGhlcmUgc28gdW5tYXNrIHVzZXMgdGhlIG9yaWdpbmFsIGZpbGxDaGFyXG4gICAgdXBkYXRlTWFza0ludGVybmFsc0ZsYWcgPT09IHRydWUgJiYgdXBkYXRlTWFza0ludGVybmFscygpXG5cbiAgICBjb25zdFxuICAgICAgcHJlTWFza2VkID0gbWFza1ZhbHVlKHVubWFza2VkLCB1cGRhdGVNYXNrSW50ZXJuYWxzRmxhZyksXG4gICAgICBtYXNrZWQgPSBwcm9wcy5maWxsTWFzayAhPT0gZmFsc2VcbiAgICAgICAgPyBmaWxsV2l0aE1hc2socHJlTWFza2VkKVxuICAgICAgICA6IHByZU1hc2tlZCxcbiAgICAgIGNoYW5nZWQgPSBpbm5lclZhbHVlLnZhbHVlICE9PSBtYXNrZWRcblxuICAgIC8vIFdlIHdhbnQgdG8gYXZvaWQgXCJmbGlja2VyaW5nXCIgc28gd2Ugc2V0IHZhbHVlIGltbWVkaWF0ZWx5XG4gICAgaW5wLnZhbHVlICE9PSBtYXNrZWQgJiYgKGlucC52YWx1ZSA9IG1hc2tlZClcblxuICAgIGNoYW5nZWQgPT09IHRydWUgJiYgKGlubmVyVmFsdWUudmFsdWUgPSBtYXNrZWQpXG5cbiAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpbnAgJiYgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgaWYgKG1hc2tlZCA9PT0gbWFza1JlcGxhY2VkKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/IG1hc2tSZXBsYWNlZC5sZW5ndGggOiAwXG4gICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKGlucHV0VHlwZSA9PT0gJ2luc2VydEZyb21QYXN0ZScgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG1heEVuZCA9IGlucC5zZWxlY3Rpb25FbmRcbiAgICAgICAgbGV0IGN1cnNvciA9IGVuZCAtIDFcbiAgICAgICAgLy8gZWFjaCBub24tbWFya2VyIGNoYXIgbWVhbnMgd2UgbW92ZSBvbmNlIHRvIHJpZ2h0XG4gICAgICAgIGZvciAobGV0IGkgPSBwYXN0ZWRUZXh0U3RhcnQ7IGkgPD0gY3Vyc29yICYmIGkgPCBtYXhFbmQ7IGkrKykge1xuICAgICAgICAgIGlmIChtYXNrTWFya2VkWyBpIF0gIT09IE1BUktFUikge1xuICAgICAgICAgICAgY3Vyc29yKytcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgY3Vyc29yKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKFsgJ2RlbGV0ZUNvbnRlbnRCYWNrd2FyZCcsICdkZWxldGVDb250ZW50Rm9yd2FyZCcgXS5pbmRleE9mKGlucHV0VHlwZSkgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZVxuICAgICAgICAgID8gKFxuICAgICAgICAgICAgICBlbmQgPT09IDBcbiAgICAgICAgICAgICAgICA/IChtYXNrZWQubGVuZ3RoID4gcHJlTWFza2VkLmxlbmd0aCA/IDEgOiAwKVxuICAgICAgICAgICAgICAgIDogTWF0aC5tYXgoMCwgbWFza2VkLmxlbmd0aCAtIChtYXNrZWQgPT09IG1hc2tSZXBsYWNlZCA/IDAgOiBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBlbmRSZXZlcnNlKSArIDEpKSArIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGVuZFxuXG4gICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAoY2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IE1hdGgubWF4KDAsIG1hc2tlZC5sZW5ndGggLSAobWFza2VkID09PSBtYXNrUmVwbGFjZWQgPyAwIDogTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kUmV2ZXJzZSArIDEpKSlcblxuICAgICAgICAgIGlmIChjdXJzb3IgPT09IDEgJiYgZW5kID09PSAxKSB7XG4gICAgICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0UmV2ZXJzZShpbnAsIGN1cnNvcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gbWFza2VkLmxlbmd0aCAtIGVuZFJldmVyc2VcbiAgICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdiYWNrd2FyZCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoY2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IE1hdGgubWF4KDAsIG1hc2tNYXJrZWQuaW5kZXhPZihNQVJLRVIpLCBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBlbmQpIC0gMSlcbiAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGVuZCAtIDFcbiAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHZhbCA9IHByb3BzLnVubWFza2VkVmFsdWUgPT09IHRydWVcbiAgICAgID8gdW5tYXNrVmFsdWUobWFza2VkKVxuICAgICAgOiBtYXNrZWRcblxuICAgIGlmIChcbiAgICAgIFN0cmluZyhwcm9wcy5tb2RlbFZhbHVlKSAhPT0gdmFsXG4gICAgICAmJiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gbnVsbCB8fCB2YWwgIT09ICcnKVxuICAgICkge1xuICAgICAgZW1pdFZhbHVlKHZhbCwgdHJ1ZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtb3ZlQ3Vyc29yRm9yUGFzdGUgKGlucCwgc3RhcnQsIGVuZCkge1xuICAgIGNvbnN0IHByZU1hc2tlZCA9IG1hc2tWYWx1ZSh1bm1hc2tWYWx1ZShpbnAudmFsdWUpKVxuXG4gICAgc3RhcnQgPSBNYXRoLm1heCgwLCBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKSwgTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgc3RhcnQpKVxuICAgIHBhc3RlZFRleHRTdGFydCA9IHN0YXJ0XG5cbiAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2Uoc3RhcnQsIGVuZCwgJ2ZvcndhcmQnKVxuICB9XG5cbiAgY29uc3QgbW92ZUN1cnNvciA9IHtcbiAgICBsZWZ0IChpbnAsIGN1cnNvcikge1xuICAgICAgY29uc3Qgbm9NYXJrQmVmb3JlID0gbWFza01hcmtlZC5zbGljZShjdXJzb3IgLSAxKS5pbmRleE9mKE1BUktFUikgPT09IC0xXG4gICAgICBsZXQgaSA9IE1hdGgubWF4KDAsIGN1cnNvciAtIDEpXG5cbiAgICAgIGZvciAoOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAobWFza01hcmtlZFsgaSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgbm9NYXJrQmVmb3JlID09PSB0cnVlICYmIGN1cnNvcisrXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIGN1cnNvciBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbWFza01hcmtlZFsgY3Vyc29yIF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgMClcbiAgICAgIH1cblxuICAgICAgY3Vyc29yID49IDAgJiYgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnYmFja3dhcmQnKVxuICAgIH0sXG5cbiAgICByaWdodCAoaW5wLCBjdXJzb3IpIHtcbiAgICAgIGNvbnN0IGxpbWl0ID0gaW5wLnZhbHVlLmxlbmd0aFxuICAgICAgbGV0IGkgPSBNYXRoLm1pbihsaW1pdCwgY3Vyc29yICsgMSlcblxuICAgICAgZm9yICg7IGkgPD0gbGltaXQ7IGkrKykge1xuICAgICAgICBpZiAobWFza01hcmtlZFsgaSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtYXNrTWFya2VkWyBpIC0gMSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpID4gbGltaXRcbiAgICAgICAgJiYgbWFza01hcmtlZFsgY3Vyc29yIC0gMSBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbWFza01hcmtlZFsgY3Vyc29yIC0gMSBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5sZWZ0KGlucCwgbGltaXQpXG4gICAgICB9XG5cbiAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgIH0sXG5cbiAgICBsZWZ0UmV2ZXJzZSAoaW5wLCBjdXJzb3IpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGxvY2FsTWFza01hcmtlZCA9IGdldFBhZGRlZE1hc2tNYXJrZWQoaW5wLnZhbHVlLmxlbmd0aClcbiAgICAgIGxldCBpID0gTWF0aC5tYXgoMCwgY3Vyc29yIC0gMSlcblxuICAgICAgZm9yICg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgLSAxIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGN1cnNvciA9IGlcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxvY2FsTWFza01hcmtlZFsgaSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBjdXJzb3IgPSBpXG4gICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA8IDBcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBjdXJzb3IgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgY3Vyc29yIF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLnJpZ2h0UmV2ZXJzZShpbnAsIDApXG4gICAgICB9XG5cbiAgICAgIGN1cnNvciA+PSAwICYmIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2JhY2t3YXJkJylcbiAgICB9LFxuXG4gICAgcmlnaHRSZXZlcnNlIChpbnAsIGN1cnNvcikge1xuICAgICAgY29uc3RcbiAgICAgICAgbGltaXQgPSBpbnAudmFsdWUubGVuZ3RoLFxuICAgICAgICBsb2NhbE1hc2tNYXJrZWQgPSBnZXRQYWRkZWRNYXNrTWFya2VkKGxpbWl0KSxcbiAgICAgICAgbm9NYXJrQmVmb3JlID0gbG9jYWxNYXNrTWFya2VkLnNsaWNlKDAsIGN1cnNvciArIDEpLmluZGV4T2YoTUFSS0VSKSA9PT0gLTFcbiAgICAgIGxldCBpID0gTWF0aC5taW4obGltaXQsIGN1cnNvciArIDEpXG5cbiAgICAgIGZvciAoOyBpIDw9IGxpbWl0OyBpKyspIHtcbiAgICAgICAgaWYgKGxvY2FsTWFza01hcmtlZFsgaSAtIDEgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgY3Vyc29yID0gaVxuICAgICAgICAgIGN1cnNvciA+IDAgJiYgbm9NYXJrQmVmb3JlID09PSB0cnVlICYmIGN1cnNvci0tXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIGkgPiBsaW1pdFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIGN1cnNvciAtIDEgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIGxvY2FsTWFza01hcmtlZFsgY3Vyc29yIC0gMSBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5sZWZ0UmV2ZXJzZShpbnAsIGxpbWl0KVxuICAgICAgfVxuXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yLCBjdXJzb3IsICdmb3J3YXJkJylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbk1hc2tlZENsaWNrIChlKSB7XG4gICAgZW1pdCgnY2xpY2snLCBlKVxuXG4gICAgc2VsZWN0aW9uQW5jaG9yID0gdm9pZCAwXG4gIH1cblxuICBmdW5jdGlvbiBvbk1hc2tlZEtleWRvd24gKGUpIHtcbiAgICBlbWl0KCdrZXlkb3duJywgZSlcblxuICAgIGlmIChcbiAgICAgIHNob3VsZElnbm9yZUtleShlKSA9PT0gdHJ1ZVxuICAgICAgfHwgZS5hbHRLZXkgPT09IHRydWUgLy8gbGV0IGJyb3dzZXIgaGFuZGxlIHRoZXNlXG4gICAgKSByZXR1cm5cblxuICAgIGNvbnN0XG4gICAgICBpbnAgPSBpbnB1dFJlZi52YWx1ZSxcbiAgICAgIHN0YXJ0ID0gaW5wLnNlbGVjdGlvblN0YXJ0LFxuICAgICAgZW5kID0gaW5wLnNlbGVjdGlvbkVuZFxuXG4gICAgaWYgKCFlLnNoaWZ0S2V5KSB7XG4gICAgICBzZWxlY3Rpb25BbmNob3IgPSB2b2lkIDBcbiAgICB9XG5cbiAgICBpZiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDM5KSB7IC8vIExlZnQgLyBSaWdodFxuICAgICAgaWYgKGUuc2hpZnRLZXkgJiYgc2VsZWN0aW9uQW5jaG9yID09PSB2b2lkIDApIHtcbiAgICAgICAgc2VsZWN0aW9uQW5jaG9yID0gaW5wLnNlbGVjdGlvbkRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gc3RhcnQgOiBlbmRcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm4gPSBtb3ZlQ3Vyc29yWyAoZS5rZXlDb2RlID09PSAzOSA/ICdyaWdodCcgOiAnbGVmdCcpICsgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/ICdSZXZlcnNlJyA6ICcnKSBdXG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZm4oaW5wLCBzZWxlY3Rpb25BbmNob3IgPT09IHN0YXJ0ID8gZW5kIDogc3RhcnQpXG5cbiAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IGlucC5zZWxlY3Rpb25TdGFydFxuICAgICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoTWF0aC5taW4oc2VsZWN0aW9uQW5jaG9yLCBjdXJzb3IpLCBNYXRoLm1heChzZWxlY3Rpb25BbmNob3IsIGN1cnNvciksICdmb3J3YXJkJylcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLmtleUNvZGUgPT09IDggLy8gQmFja3NwYWNlXG4gICAgICAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWVcbiAgICAgICYmIHN0YXJ0ID09PSBlbmRcbiAgICApIHtcbiAgICAgIG1vdmVDdXJzb3IubGVmdChpbnAsIHN0YXJ0KVxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGlucC5zZWxlY3Rpb25TdGFydCwgZW5kLCAnYmFja3dhcmQnKVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGUua2V5Q29kZSA9PT0gNDYgLy8gRGVsZXRlXG4gICAgICAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWVcbiAgICAgICYmIHN0YXJ0ID09PSBlbmRcbiAgICApIHtcbiAgICAgIG1vdmVDdXJzb3IucmlnaHRSZXZlcnNlKGlucCwgZW5kKVxuICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0LCBpbnAuc2VsZWN0aW9uRW5kLCAnZm9yd2FyZCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFza1ZhbHVlICh2YWwsIHVwZGF0ZU1hc2tJbnRlcm5hbHNGbGFnKSB7XG4gICAgaWYgKHZhbCA9PT0gdm9pZCAwIHx8IHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09ICcnKSB7IHJldHVybiAnJyB9XG5cbiAgICBpZiAocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gbWFza1ZhbHVlUmV2ZXJzZSh2YWwsIHVwZGF0ZU1hc2tJbnRlcm5hbHNGbGFnKVxuICAgIH1cblxuICAgIGNvbnN0IG1hc2sgPSBjb21wdXRlZE1hc2tcblxuICAgIGxldCB2YWxJbmRleCA9IDAsIG91dHB1dCA9ICcnXG5cbiAgICBmb3IgKGxldCBtYXNrSW5kZXggPSAwOyBtYXNrSW5kZXggPCBtYXNrLmxlbmd0aDsgbWFza0luZGV4KyspIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF0sXG4gICAgICAgIG1hc2tEZWYgPSBtYXNrWyBtYXNrSW5kZXggXVxuXG4gICAgICBpZiAodHlwZW9mIG1hc2tEZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG91dHB1dCArPSBtYXNrRGVmXG5cbiAgICAgICAgaWYgKHVwZGF0ZU1hc2tJbnRlcm5hbHNGbGFnID09PSB0cnVlICYmIHZhbENoYXIgPT09IG1hc2tEZWYpIHtcbiAgICAgICAgICB2YWxJbmRleCsrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpIHtcbiAgICAgICAgb3V0cHV0ICs9IG1hc2tEZWYudHJhbnNmb3JtICE9PSB2b2lkIDBcbiAgICAgICAgICA/IG1hc2tEZWYudHJhbnNmb3JtKHZhbENoYXIpXG4gICAgICAgICAgOiB2YWxDaGFyXG4gICAgICAgIHZhbEluZGV4KytcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgZnVuY3Rpb24gbWFza1ZhbHVlUmV2ZXJzZSAodmFsLCB1cGRhdGVNYXNrSW50ZXJuYWxzRmxhZykge1xuICAgIGNvbnN0XG4gICAgICBtYXNrID0gY29tcHV0ZWRNYXNrLFxuICAgICAgZmlyc3RUb2tlbkluZGV4ID0gbWFza01hcmtlZC5pbmRleE9mKE1BUktFUilcblxuICAgIGxldCB2YWxJbmRleCA9IHZhbC5sZW5ndGggLSAxLCBvdXRwdXQgPSAnJ1xuXG4gICAgZm9yIChsZXQgbWFza0luZGV4ID0gbWFzay5sZW5ndGggLSAxOyBtYXNrSW5kZXggPj0gMCAmJiB2YWxJbmRleCAhPT0gLTE7IG1hc2tJbmRleC0tKSB7XG4gICAgICBjb25zdCBtYXNrRGVmID0gbWFza1sgbWFza0luZGV4IF1cblxuICAgICAgbGV0IHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF1cblxuICAgICAgaWYgKHR5cGVvZiBtYXNrRGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICBvdXRwdXQgPSBtYXNrRGVmICsgb3V0cHV0XG5cbiAgICAgICAgaWYgKHVwZGF0ZU1hc2tJbnRlcm5hbHNGbGFnID09PSB0cnVlICYmIHZhbENoYXIgPT09IG1hc2tEZWYpIHtcbiAgICAgICAgICB2YWxJbmRleC0tXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG91dHB1dCA9IChtYXNrRGVmLnRyYW5zZm9ybSAhPT0gdm9pZCAwID8gbWFza0RlZi50cmFuc2Zvcm0odmFsQ2hhcikgOiB2YWxDaGFyKSArIG91dHB1dFxuICAgICAgICAgIHZhbEluZGV4LS1cbiAgICAgICAgICB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bm1vZGlmaWVkLWxvb3AtY29uZGl0aW9uXG4gICAgICAgIH0gd2hpbGUgKGZpcnN0VG9rZW5JbmRleCA9PT0gbWFza0luZGV4ICYmIHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXRcbiAgfVxuXG4gIGZ1bmN0aW9uIHVubWFza1ZhbHVlICh2YWwpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3N0cmluZycgfHwgY29tcHV0ZWRVbm1hc2sgPT09IHZvaWQgMFxuICAgICAgPyAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicgPyBjb21wdXRlZFVubWFzaygnJyArIHZhbCkgOiB2YWwpXG4gICAgICA6IGNvbXB1dGVkVW5tYXNrKHZhbClcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGxXaXRoTWFzayAodmFsKSB7XG4gICAgaWYgKG1hc2tSZXBsYWNlZC5sZW5ndGggLSB2YWwubGVuZ3RoIDw9IDApIHtcbiAgICAgIHJldHVybiB2YWxcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlICYmIHZhbC5sZW5ndGggIT09IDBcbiAgICAgID8gbWFza1JlcGxhY2VkLnNsaWNlKDAsIC12YWwubGVuZ3RoKSArIHZhbFxuICAgICAgOiB2YWwgKyBtYXNrUmVwbGFjZWQuc2xpY2UodmFsLmxlbmd0aClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5uZXJWYWx1ZSxcbiAgICBoYXNNYXNrLFxuICAgIG1vdmVDdXJzb3JGb3JQYXN0ZSxcbiAgICB1cGRhdGVNYXNrVmFsdWUsXG4gICAgb25NYXNrZWRLZXlkb3duLFxuICAgIG9uTWFza2VkQ2xpY2tcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VGb3JtUHJvcHMgPSB7XG4gIG5hbWU6IFN0cmluZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRm9ybUF0dHJzIChwcm9wcykge1xuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgIHZhbHVlOiBwcm9wcy5tb2RlbFZhbHVlXG4gIH0pKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRm9ybUluamVjdCAoZm9ybUF0dHJzID0ge30pIHtcbiAgcmV0dXJuIChjaGlsZCwgYWN0aW9uLCBjbGFzc05hbWUpID0+IHtcbiAgICBjaGlsZFsgYWN0aW9uIF0oXG4gICAgICBoKCdpbnB1dCcsIHtcbiAgICAgICAgY2xhc3M6ICdoaWRkZW4nICsgKGNsYXNzTmFtZSB8fCAnJyksXG4gICAgICAgIC4uLmZvcm1BdHRycy52YWx1ZVxuICAgICAgfSlcbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1JbnB1dE5hbWVBdHRyIChwcm9wcykge1xuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gcHJvcHMubmFtZSB8fCBwcm9wcy5mb3IpXG59XG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCB0eXBlR3VhcmQpIHtcbiAgZnVuY3Rpb24gZ2V0Rm9ybURvbVByb3BzICgpIHtcbiAgICBjb25zdCBtb2RlbCA9IHByb3BzLm1vZGVsVmFsdWVcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkdCA9ICdEYXRhVHJhbnNmZXInIGluIHdpbmRvd1xuICAgICAgICA/IG5ldyBEYXRhVHJhbnNmZXIoKVxuICAgICAgICA6ICgnQ2xpcGJvYXJkRXZlbnQnIGluIHdpbmRvd1xuICAgICAgICAgICAgPyBuZXcgQ2xpcGJvYXJkRXZlbnQoJycpLmNsaXBib2FyZERhdGFcbiAgICAgICAgICAgIDogdm9pZCAwXG4gICAgICAgICAgKVxuXG4gICAgICBpZiAoT2JqZWN0KG1vZGVsKSA9PT0gbW9kZWwpIHtcbiAgICAgICAgKCdsZW5ndGgnIGluIG1vZGVsXG4gICAgICAgICAgPyBBcnJheS5mcm9tKG1vZGVsKVxuICAgICAgICAgIDogWyBtb2RlbCBdXG4gICAgICAgICkuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgICAgICBkdC5pdGVtcy5hZGQoZmlsZSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZmlsZXM6IGR0LmZpbGVzXG4gICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmaWxlczogdm9pZCAwXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHR5cGVHdWFyZCA9PT0gdHJ1ZVxuICAgID8gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLnR5cGUgIT09ICdmaWxlJykgcmV0dXJuXG4gICAgICByZXR1cm4gZ2V0Rm9ybURvbVByb3BzKClcbiAgICB9KVxuICAgIDogY29tcHV0ZWQoZ2V0Rm9ybURvbVByb3BzKVxufVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vLi4vcGx1Z2lucy9wbGF0Zm9ybS9QbGF0Zm9ybS5qcydcblxuY29uc3QgaXNKYXBhbmVzZSA9IC9bXFx1MzAwMC1cXHUzMDNmXFx1MzA0MC1cXHUzMDlmXFx1MzBhMC1cXHUzMGZmXFx1ZmYwMC1cXHVmZjlmXFx1NGUwMC1cXHU5ZmFmXFx1MzQwMC1cXHU0ZGJmXS9cbmNvbnN0IGlzQ2hpbmVzZSA9IC9bXFx1NGUwMC1cXHU5ZmZmXFx1MzQwMC1cXHU0ZGJmXFx1ezIwMDAwfS1cXHV7MmE2ZGZ9XFx1ezJhNzAwfS1cXHV7MmI3M2Z9XFx1ezJiNzQwfS1cXHV7MmI4MWZ9XFx1ezJiODIwfS1cXHV7MmNlYWZ9XFx1ZjkwMC1cXHVmYWZmXFx1MzMwMC1cXHUzM2ZmXFx1ZmUzMC1cXHVmZTRmXFx1ZjkwMC1cXHVmYWZmXFx1ezJmODAwfS1cXHV7MmZhMWZ9XS91XG5jb25zdCBpc0tvcmVhbiA9IC9bXFx1MzEzMS1cXHUzMTRlXFx1MzE0Zi1cXHUzMTYzXFx1YWMwMC1cXHVkN2EzXS9cbmNvbnN0IGlzUGxhaW5UZXh0ID0gL1thLXowLTlfIC1dJC9pXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChvbklucHV0KSB7XG4gIHJldHVybiBmdW5jdGlvbiBvbkNvbXBvc2l0aW9uIChlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2NvbXBvc2l0aW9uZW5kJyB8fCBlLnR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgICBpZiAoZS50YXJnZXQucUNvbXBvc2luZyAhPT0gdHJ1ZSkgcmV0dXJuXG4gICAgICBlLnRhcmdldC5xQ29tcG9zaW5nID0gZmFsc2VcbiAgICAgIG9uSW5wdXQoZSlcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLnR5cGUgPT09ICdjb21wb3NpdGlvbnVwZGF0ZSdcbiAgICAgICYmIGUudGFyZ2V0LnFDb21wb3NpbmcgIT09IHRydWVcbiAgICAgICYmIHR5cGVvZiBlLmRhdGEgPT09ICdzdHJpbmcnXG4gICAgKSB7XG4gICAgICBjb25zdCBpc0NvbXBvc2luZyA9IGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlXG4gICAgICAgID8gaXNQbGFpblRleHQudGVzdChlLmRhdGEpID09PSBmYWxzZVxuICAgICAgICA6IGlzSmFwYW5lc2UudGVzdChlLmRhdGEpID09PSB0cnVlIHx8IGlzQ2hpbmVzZS50ZXN0KGUuZGF0YSkgPT09IHRydWUgfHwgaXNLb3JlYW4udGVzdChlLmRhdGEpID09PSB0cnVlXG5cbiAgICAgIGlmIChpc0NvbXBvc2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICBlLnRhcmdldC5xQ29tcG9zaW5nID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgb25Nb3VudGVkLCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRmllbGQsIHsgdXNlRmllbGRTdGF0ZSwgdXNlRmllbGRQcm9wcywgdXNlRmllbGRFbWl0cywgZmllbGRWYWx1ZUlzRmlsbGVkIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZmllbGQvdXNlLWZpZWxkLmpzJ1xuaW1wb3J0IHVzZU1hc2ssIHsgdXNlTWFza1Byb3BzIH0gZnJvbSAnLi91c2UtbWFzay5qcydcbmltcG9ydCB7IHVzZUZvcm1Qcm9wcywgdXNlRm9ybUlucHV0TmFtZUF0dHIgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy91c2UtZm9ybS9wcml2YXRlLnVzZS1mb3JtLmpzJ1xuaW1wb3J0IHVzZUZpbGVGb3JtRG9tUHJvcHMgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2UtZmlsZS91c2UtZmlsZS1kb20tcHJvcHMuanMnXG5pbXBvcnQgdXNlS2V5Q29tcG9zaXRpb24gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS51c2Uta2V5LWNvbXBvc2l0aW9uL3VzZS1rZXktY29tcG9zaXRpb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuY3JlYXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHN0b3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmZvY3VzL2ZvY3VzLW1hbmFnZXIuanMnXG5pbXBvcnQgeyBpbmplY3RQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5pbmplY3Qtb2JqLXByb3AvaW5qZWN0LW9iai1wcm9wLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUlucHV0JyxcblxuICBpbmhlcml0QXR0cnM6IGZhbHNlLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRmllbGRQcm9wcyxcbiAgICAuLi51c2VNYXNrUHJvcHMsXG4gICAgLi4udXNlRm9ybVByb3BzLFxuXG4gICAgLy8gb3ZlcnJpZGUgb2YgdXNlRmllbGRQcm9wcyA+IG1vZGVsVmFsdWVcbiAgICBtb2RlbFZhbHVlOiBfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgICAgID8ge30gLy8gU1NSIGRvZXMgbm90IGtub3cgYWJvdXQgRmlsZUxpc3RcbiAgICAgIDogWyBTdHJpbmcsIE51bWJlciwgRmlsZUxpc3QgXSxcblxuICAgIHNoYWRvd1RleHQ6IFN0cmluZyxcblxuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICd0ZXh0J1xuICAgIH0sXG5cbiAgICBkZWJvdW5jZTogWyBTdHJpbmcsIE51bWJlciBdLFxuXG4gICAgYXV0b2dyb3c6IEJvb2xlYW4sIC8vIG1ha2VzIGEgdGV4dGFyZWFcblxuICAgIGlucHV0Q2xhc3M6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF0sXG4gICAgaW5wdXRTdHlsZTogWyBBcnJheSwgU3RyaW5nLCBPYmplY3QgXVxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlRmllbGRFbWl0cyxcbiAgICAncGFzdGUnLCAnY2hhbmdlJyxcbiAgICAna2V5ZG93bicsICdjbGljaycsICdhbmltYXRpb25lbmQnXG4gIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQsIGF0dHJzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgICBjb25zdCB0ZW1wID0ge31cbiAgICBsZXQgZW1pdENhY2hlZFZhbHVlID0gTmFOLCB0eXBlZE51bWJlciwgc3RvcFZhbHVlV2F0Y2hlciwgZW1pdFRpbWVyID0gbnVsbCwgZW1pdFZhbHVlRm5cblxuICAgIGNvbnN0IGlucHV0UmVmID0gcmVmKG51bGwpXG4gICAgY29uc3QgbmFtZVByb3AgPSB1c2VGb3JtSW5wdXROYW1lQXR0cihwcm9wcylcblxuICAgIGNvbnN0IHtcbiAgICAgIGlubmVyVmFsdWUsXG4gICAgICBoYXNNYXNrLFxuICAgICAgbW92ZUN1cnNvckZvclBhc3RlLFxuICAgICAgdXBkYXRlTWFza1ZhbHVlLFxuICAgICAgb25NYXNrZWRLZXlkb3duLFxuICAgICAgb25NYXNrZWRDbGlja1xuICAgIH0gPSB1c2VNYXNrKHByb3BzLCBlbWl0LCBlbWl0VmFsdWUsIGlucHV0UmVmKVxuXG4gICAgY29uc3QgZm9ybURvbVByb3BzID0gdXNlRmlsZUZvcm1Eb21Qcm9wcyhwcm9wcywgLyogdHlwZSBndWFyZCAqLyB0cnVlKVxuICAgIGNvbnN0IGhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKGlubmVyVmFsdWUudmFsdWUpKVxuXG4gICAgY29uc3Qgb25Db21wb3NpdGlvbiA9IHVzZUtleUNvbXBvc2l0aW9uKG9uSW5wdXQpXG5cbiAgICBjb25zdCBzdGF0ZSA9IHVzZUZpZWxkU3RhdGUoeyBjaGFuZ2VFdmVudDogdHJ1ZSB9KVxuXG4gICAgY29uc3QgaXNUZXh0YXJlYSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy50eXBlID09PSAndGV4dGFyZWEnIHx8IHByb3BzLmF1dG9ncm93ID09PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgaXNUeXBlVGV4dCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlXG4gICAgICB8fCBbICd0ZXh0JywgJ3NlYXJjaCcsICd1cmwnLCAndGVsJywgJ3Bhc3N3b3JkJyBdLmluY2x1ZGVzKHByb3BzLnR5cGUpXG4gICAgKVxuXG4gICAgY29uc3Qgb25FdmVudHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBldnQgPSB7XG4gICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMubGlzdGVuZXJzLnZhbHVlLFxuICAgICAgICBvbklucHV0LFxuICAgICAgICBvblBhc3RlLFxuICAgICAgICAvLyBTYWZhcmkgPCAxMC4yICYgVUlXZWJWaWV3IGRvZXNuJ3QgZmlyZSBjb21wb3NpdGlvbmVuZCB3aGVuXG4gICAgICAgIC8vIHN3aXRjaGluZyBmb2N1cyBiZWZvcmUgY29uZmlybWluZyBjb21wb3NpdGlvbiBjaG9pY2VcbiAgICAgICAgLy8gdGhpcyBhbHNvIGZpeGVzIHRoZSBpc3N1ZSB3aGVyZSBzb21lIGJyb3dzZXJzIGUuZy4gaU9TIENocm9tZVxuICAgICAgICAvLyBmaXJlcyBcImNoYW5nZVwiIGluc3RlYWQgb2YgXCJpbnB1dFwiIG9uIGF1dG9jb21wbGV0ZS5cbiAgICAgICAgb25DaGFuZ2UsXG4gICAgICAgIG9uQmx1cjogb25GaW5pc2hFZGl0aW5nLFxuICAgICAgICBvbkZvY3VzOiBzdG9wXG4gICAgICB9XG5cbiAgICAgIGV2dC5vbkNvbXBvc2l0aW9uc3RhcnQgPSBldnQub25Db21wb3NpdGlvbnVwZGF0ZSA9IGV2dC5vbkNvbXBvc2l0aW9uZW5kID0gb25Db21wb3NpdGlvblxuXG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBldnQub25LZXlkb3duID0gb25NYXNrZWRLZXlkb3duXG4gICAgICAgIC8vIHJlc2V0IHNlbGVjdGlvbiBhbmNob3Igb24gcG9pbnRlciBzZWxlY3Rpb25cbiAgICAgICAgZXZ0Lm9uQ2xpY2sgPSBvbk1hc2tlZENsaWNrXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSkge1xuICAgICAgICBldnQub25BbmltYXRpb25lbmQgPSBvbkFuaW1hdGlvbmVuZFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXZ0XG4gICAgfSlcblxuICAgIGNvbnN0IGlucHV0QXR0cnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhdHRycyA9IHtcbiAgICAgICAgdGFiaW5kZXg6IDAsXG4gICAgICAgICdkYXRhLWF1dG9mb2N1cyc6IHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSB8fCB2b2lkIDAsXG4gICAgICAgIHJvd3M6IHByb3BzLnR5cGUgPT09ICd0ZXh0YXJlYScgPyA2IDogdm9pZCAwLFxuICAgICAgICAnYXJpYS1sYWJlbCc6IHByb3BzLmxhYmVsLFxuICAgICAgICBuYW1lOiBuYW1lUHJvcC52YWx1ZSxcbiAgICAgICAgLi4uc3RhdGUuc3BsaXRBdHRycy5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgICBpZDogc3RhdGUudGFyZ2V0VWlkLnZhbHVlLFxuICAgICAgICBtYXhsZW5ndGg6IHByb3BzLm1heGxlbmd0aCxcbiAgICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGUgPT09IHRydWUsXG4gICAgICAgIHJlYWRvbmx5OiBwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNUZXh0YXJlYS52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYXR0cnMudHlwZSA9IHByb3BzLnR5cGVcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLmF1dG9ncm93ID09PSB0cnVlKSB7XG4gICAgICAgIGF0dHJzLnJvd3MgPSAxXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhdHRyc1xuICAgIH0pXG5cbiAgICAvLyBzb21lIGJyb3dzZXJzIGxvc2UgdGhlIG5hdGl2ZSBpbnB1dCB2YWx1ZVxuICAgIC8vIHNvIHdlIG5lZWQgdG8gcmVhdHRhY2ggaXQgZHluYW1pY2FsbHlcbiAgICAvLyAobGlrZSB0eXBlPVwicGFzc3dvcmRcIiA8LT4gdHlwZT1cInRleHRcIjsgc2VlICMxMjA3OClcbiAgICB3YXRjaCgoKSA9PiBwcm9wcy50eXBlLCAoKSA9PiB7XG4gICAgICBpZiAoaW5wdXRSZWYudmFsdWUpIHtcbiAgICAgICAgaW5wdXRSZWYudmFsdWUudmFsdWUgPSBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsIHYgPT4ge1xuICAgICAgaWYgKGhhc01hc2sudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHN0b3BWYWx1ZVdhdGNoZXIgPT09IHRydWUpIHtcbiAgICAgICAgICBzdG9wVmFsdWVXYXRjaGVyID0gZmFsc2VcbiAgICAgICAgICBpZiAoU3RyaW5nKHYpID09PSBlbWl0Q2FjaGVkVmFsdWUpIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlTWFza1ZhbHVlKHYpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpbm5lclZhbHVlLnZhbHVlICE9PSB2KSB7XG4gICAgICAgIGlubmVyVmFsdWUudmFsdWUgPSB2XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByb3BzLnR5cGUgPT09ICdudW1iZXInXG4gICAgICAgICAgJiYgdGVtcC5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodHlwZWROdW1iZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHR5cGVkTnVtYmVyID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgdGVtcC52YWx1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB0ZXh0YXJlYSBvbmx5XG4gICAgICBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSAmJiBuZXh0VGljayhhZGp1c3RIZWlnaHQpXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmF1dG9ncm93LCB2YWwgPT4ge1xuICAgICAgLy8gdGV4dGFyZWEgb25seVxuICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICBuZXh0VGljayhhZGp1c3RIZWlnaHQpXG4gICAgICB9XG4gICAgICAvLyBpZiBpdCBoYXMgYSBudW1iZXIgb2Ygcm93cyBzZXQgcmVzcGVjdCBpdFxuICAgICAgZWxzZSBpZiAoaW5wdXRSZWYudmFsdWUgIT09IG51bGwgJiYgYXR0cnMucm93cyA+IDApIHtcbiAgICAgICAgaW5wdXRSZWYudmFsdWUuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmRlbnNlLCAoKSA9PiB7XG4gICAgICBwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSAmJiBuZXh0VGljayhhZGp1c3RIZWlnaHQpXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIGZvY3VzICgpIHtcbiAgICAgIGFkZEZvY3VzRm4oKCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlucHV0UmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICAgJiYgaW5wdXRSZWYudmFsdWUgIT09IGVsXG4gICAgICAgICAgJiYgKGVsID09PSBudWxsIHx8IGVsLmlkICE9PSBzdGF0ZS50YXJnZXRVaWQudmFsdWUpXG4gICAgICAgICkge1xuICAgICAgICAgIGlucHV0UmVmLnZhbHVlLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlbGVjdCAoKSB7XG4gICAgICBpbnB1dFJlZi52YWx1ZT8uc2VsZWN0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhc3RlIChlKSB7XG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgaW5wID0gZS50YXJnZXRcbiAgICAgICAgbW92ZUN1cnNvckZvclBhc3RlKGlucCwgaW5wLnNlbGVjdGlvblN0YXJ0LCBpbnAuc2VsZWN0aW9uRW5kKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdwYXN0ZScsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25JbnB1dCAoZSkge1xuICAgICAgaWYgKCFlIHx8ICFlLnRhcmdldCkgcmV0dXJuXG5cbiAgICAgIGlmIChwcm9wcy50eXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBlLnRhcmdldC5maWxlcylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbCA9IGUudGFyZ2V0LnZhbHVlXG5cbiAgICAgIGlmIChlLnRhcmdldC5xQ29tcG9zaW5nID09PSB0cnVlKSB7XG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZU1hc2tWYWx1ZSh2YWwsIGZhbHNlLCBlLmlucHV0VHlwZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBlbWl0VmFsdWUodmFsKVxuXG4gICAgICAgIGlmIChpc1R5cGVUZXh0LnZhbHVlID09PSB0cnVlICYmIGUudGFyZ2V0ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgY29uc3QgeyBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kIH0gPSBlLnRhcmdldFxuXG4gICAgICAgICAgaWYgKHNlbGVjdGlvblN0YXJ0ICE9PSB2b2lkIDAgJiYgc2VsZWN0aW9uRW5kICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIHZhbC5pbmRleE9mKGUudGFyZ2V0LnZhbHVlKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gdHJpZ2dlciBpdCBpbW1lZGlhdGVseSB0b28sXG4gICAgICAvLyB0byBhdm9pZCBcImZsaWNrZXJpbmdcIlxuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgYWRqdXN0SGVpZ2h0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkFuaW1hdGlvbmVuZCAoZSkge1xuICAgICAgZW1pdCgnYW5pbWF0aW9uZW5kJywgZSlcbiAgICAgIGFkanVzdEhlaWdodCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW1pdFZhbHVlICh2YWwsIHN0b3BXYXRjaGVyKSB7XG4gICAgICBlbWl0VmFsdWVGbiA9ICgpID0+IHtcbiAgICAgICAgZW1pdFRpbWVyID0gbnVsbFxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wcy50eXBlICE9PSAnbnVtYmVyJ1xuICAgICAgICAgICYmIHRlbXAuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGVsZXRlIHRlbXAudmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy5tb2RlbFZhbHVlICE9PSB2YWwgJiYgZW1pdENhY2hlZFZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgICBlbWl0Q2FjaGVkVmFsdWUgPSB2YWxcblxuICAgICAgICAgIHN0b3BXYXRjaGVyID09PSB0cnVlICYmIChzdG9wVmFsdWVXYXRjaGVyID0gdHJ1ZSlcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHZhbClcblxuICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgIGVtaXRDYWNoZWRWYWx1ZSA9PT0gdmFsICYmIChlbWl0Q2FjaGVkVmFsdWUgPSBOYU4pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXRWYWx1ZUZuID0gdm9pZCAwXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy50eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICB0eXBlZE51bWJlciA9IHRydWVcbiAgICAgICAgdGVtcC52YWx1ZSA9IHZhbFxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuZGVib3VuY2UgIT09IHZvaWQgMCkge1xuICAgICAgICBlbWl0VGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGVtaXRUaW1lcilcbiAgICAgICAgdGVtcC52YWx1ZSA9IHZhbFxuICAgICAgICBlbWl0VGltZXIgPSBzZXRUaW1lb3V0KGVtaXRWYWx1ZUZuLCBwcm9wcy5kZWJvdW5jZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBlbWl0VmFsdWVGbigpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdGV4dGFyZWEgb25seVxuICAgIGZ1bmN0aW9uIGFkanVzdEhlaWdodCAoKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnAgPSBpbnB1dFJlZi52YWx1ZVxuICAgICAgICBpZiAoaW5wICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgcGFyZW50U3R5bGUgPSBpbnAucGFyZW50Tm9kZS5zdHlsZVxuICAgICAgICAgIC8vIGNocm9tZSBkb2VzIG5vdCBrZWVwIHNjcm9sbCAjMTU0OThcbiAgICAgICAgICBjb25zdCB7IHNjcm9sbFRvcCB9ID0gaW5wXG4gICAgICAgICAgLy8gY2hyb21lIGNhbGN1bGF0ZXMgYSBzbWFsbGVyIHNjcm9sbEhlaWdodCB3aGVuIGluIGEgLmNvbHVtbiBjb250YWluZXJcbiAgICAgICAgICBjb25zdCB7IG92ZXJmbG93WSwgbWF4SGVpZ2h0IH0gPSAkcS5wbGF0Zm9ybS5pcy5maXJlZm94ID09PSB0cnVlXG4gICAgICAgICAgICA/IHt9XG4gICAgICAgICAgICA6IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGlucClcbiAgICAgICAgICAvLyBvbiBmaXJlZm94IG9yIGlmIG92ZXJmbG93WSBpcyBzcGVjaWZpZWQgYXMgc2Nyb2xsICMxNDI2MywgIzE0MzQ0XG4gICAgICAgICAgLy8gd2UgZG9uJ3QgdG91Y2ggb3ZlcmZsb3dcbiAgICAgICAgICAvLyBmaXJlZm94IGlzIG5vdCBzbyBiYWQgaW4gdGhlIGVuZFxuICAgICAgICAgIGNvbnN0IGNoYW5nZU92ZXJmbG93ID0gb3ZlcmZsb3dZICE9PSB2b2lkIDAgJiYgb3ZlcmZsb3dZICE9PSAnc2Nyb2xsJ1xuXG4gICAgICAgICAgLy8gcmVzZXQgaGVpZ2h0IG9mIHRleHRhcmVhIHRvIGEgc21hbGwgc2l6ZSB0byBkZXRlY3QgdGhlIHJlYWwgaGVpZ2h0XG4gICAgICAgICAgLy8gYnV0IGtlZXAgdGhlIHRvdGFsIGNvbnRyb2wgc2l6ZSB0aGUgc2FtZVxuICAgICAgICAgIGNoYW5nZU92ZXJmbG93ID09PSB0cnVlICYmIChpbnAuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbicpXG4gICAgICAgICAgcGFyZW50U3R5bGUubWFyZ2luQm90dG9tID0gKGlucC5zY3JvbGxIZWlnaHQgLSAxKSArICdweCdcbiAgICAgICAgICBpbnAuc3R5bGUuaGVpZ2h0ID0gJzFweCdcblxuICAgICAgICAgIGlucC5zdHlsZS5oZWlnaHQgPSBpbnAuc2Nyb2xsSGVpZ2h0ICsgJ3B4J1xuICAgICAgICAgIC8vIHdlIHNob3VsZCBhbGxvdyBzY3JvbGxiYXJzIG9ubHlcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBtYXhIZWlnaHQgYW5kIGNvbnRlbnQgaXMgdGFsbGVyIHRoYW4gbWF4SGVpZ2h0XG4gICAgICAgICAgY2hhbmdlT3ZlcmZsb3cgPT09IHRydWUgJiYgKGlucC5zdHlsZS5vdmVyZmxvd1kgPSBwYXJzZUludChtYXhIZWlnaHQsIDEwKSA8IGlucC5zY3JvbGxIZWlnaHQgPyAnYXV0bycgOiAnaGlkZGVuJylcbiAgICAgICAgICBwYXJlbnRTdHlsZS5tYXJnaW5Cb3R0b20gPSAnJ1xuICAgICAgICAgIGlucC5zY3JvbGxUb3AgPSBzY3JvbGxUb3BcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSAoZSkge1xuICAgICAgb25Db21wb3NpdGlvbihlKVxuXG4gICAgICBpZiAoZW1pdFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChlbWl0VGltZXIpXG4gICAgICAgIGVtaXRUaW1lciA9IG51bGxcbiAgICAgIH1cblxuICAgICAgZW1pdFZhbHVlRm4/LigpXG5cbiAgICAgIGVtaXQoJ2NoYW5nZScsIGUudGFyZ2V0LnZhbHVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRmluaXNoRWRpdGluZyAoZSkge1xuICAgICAgZSAhPT0gdm9pZCAwICYmIHN0b3AoZSlcblxuICAgICAgaWYgKGVtaXRUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoZW1pdFRpbWVyKVxuICAgICAgICBlbWl0VGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGVtaXRWYWx1ZUZuPy4oKVxuXG4gICAgICB0eXBlZE51bWJlciA9IGZhbHNlXG4gICAgICBzdG9wVmFsdWVXYXRjaGVyID0gZmFsc2VcbiAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gdXNlIHNldFRpbWVvdXQgaW5zdGVhZCBvZiB0aGlzLiRuZXh0VGlja1xuICAgICAgLy8gdG8gYXZvaWQgYSBidWcgd2hlcmUgZm9jdXNvdXQgaXMgbm90IGVtaXR0ZWQgZm9yIHR5cGUgZGF0ZS90aW1lL3dlZWsvLi4uXG4gICAgICBwcm9wcy50eXBlICE9PSAnZmlsZScgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlucHV0UmVmLnZhbHVlLnZhbHVlID0gaW5uZXJWYWx1ZS52YWx1ZSAhPT0gdm9pZCAwID8gaW5uZXJWYWx1ZS52YWx1ZSA6ICcnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q3VyVmFsdWUgKCkge1xuICAgICAgcmV0dXJuIHRlbXAuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPT09IHRydWVcbiAgICAgICAgPyB0ZW1wLnZhbHVlXG4gICAgICAgIDogKGlubmVyVmFsdWUudmFsdWUgIT09IHZvaWQgMCA/IGlubmVyVmFsdWUudmFsdWUgOiAnJylcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgb25GaW5pc2hFZGl0aW5nKClcbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIGFkanVzdEhlaWdodCgpXG4gICAgfSlcblxuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICAgIGlubmVyVmFsdWUsXG5cbiAgICAgIGZpZWxkQ2xhc3M6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIGBxLSR7IGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWUgPyAndGV4dGFyZWEnIDogJ2lucHV0JyB9YFxuICAgICAgICArIChwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSA/ICcgcS10ZXh0YXJlYS0tYXV0b2dyb3cnIDogJycpXG4gICAgICApLFxuXG4gICAgICBoYXNTaGFkb3c6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIHByb3BzLnR5cGUgIT09ICdmaWxlJ1xuICAgICAgICAmJiB0eXBlb2YgcHJvcHMuc2hhZG93VGV4dCA9PT0gJ3N0cmluZydcbiAgICAgICAgJiYgcHJvcHMuc2hhZG93VGV4dC5sZW5ndGggIT09IDBcbiAgICAgICksXG5cbiAgICAgIGlucHV0UmVmLFxuXG4gICAgICBlbWl0VmFsdWUsXG5cbiAgICAgIGhhc1ZhbHVlLFxuXG4gICAgICBmbG9hdGluZ0xhYmVsOiBjb21wdXRlZCgoKSA9PlxuICAgICAgICAoXG4gICAgICAgICAgaGFzVmFsdWUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAmJiAocHJvcHMudHlwZSAhPT0gJ251bWJlcicgfHwgaXNOYU4oaW5uZXJWYWx1ZS52YWx1ZSkgPT09IGZhbHNlKVxuICAgICAgICApXG4gICAgICAgIHx8IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5kaXNwbGF5VmFsdWUpXG4gICAgICApLFxuXG4gICAgICBnZXRDb250cm9sOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiBoKGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWUgPyAndGV4dGFyZWEnIDogJ2lucHV0Jywge1xuICAgICAgICAgIHJlZjogaW5wdXRSZWYsXG4gICAgICAgICAgY2xhc3M6IFtcbiAgICAgICAgICAgICdxLWZpZWxkX19uYXRpdmUgcS1wbGFjZWhvbGRlcicsXG4gICAgICAgICAgICBwcm9wcy5pbnB1dENsYXNzXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzdHlsZTogcHJvcHMuaW5wdXRTdHlsZSxcbiAgICAgICAgICAuLi5pbnB1dEF0dHJzLnZhbHVlLFxuICAgICAgICAgIC4uLm9uRXZlbnRzLnZhbHVlLFxuICAgICAgICAgIC4uLihcbiAgICAgICAgICAgIHByb3BzLnR5cGUgIT09ICdmaWxlJ1xuICAgICAgICAgICAgICA/IHsgdmFsdWU6IGdldEN1clZhbHVlKCkgfVxuICAgICAgICAgICAgICA6IGZvcm1Eb21Qcm9wcy52YWx1ZVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIH0sXG5cbiAgICAgIGdldFNoYWRvd0NvbnRyb2w6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX25hdGl2ZSBxLWZpZWxkX19zaGFkb3cgYWJzb2x1dGUtYm90dG9tIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICAgICAgKyAoaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogJyB0ZXh0LW5vLXdyYXAnKVxuICAgICAgICB9LCBbXG4gICAgICAgICAgaCgnc3BhbicsIHsgY2xhc3M6ICdpbnZpc2libGUnIH0sIGdldEN1clZhbHVlKCkpLFxuICAgICAgICAgIGgoJ3NwYW4nLCBwcm9wcy5zaGFkb3dUZXh0KVxuICAgICAgICBdKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCByZW5kZXJGbiA9IHVzZUZpZWxkKHN0YXRlKVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbihwcm94eSwge1xuICAgICAgZm9jdXMsXG4gICAgICBzZWxlY3QsXG4gICAgICBnZXROYXRpdmVFbGVtZW50OiAoKSA9PiBpbnB1dFJlZi52YWx1ZSAvLyBkZXByZWNhdGVkXG4gICAgfSlcblxuICAgIGluamVjdFByb3AocHJveHksICduYXRpdmVFbCcsICgpID0+IGlucHV0UmVmLnZhbHVlKVxuXG4gICAgcmV0dXJuIHJlbmRlckZuXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLnJlbmRlci9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQnRuR3JvdXAnLFxuXG4gIHByb3BzOiB7XG4gICAgdW5lbGV2YXRlZDogQm9vbGVhbixcbiAgICBvdXRsaW5lOiBCb29sZWFuLFxuICAgIGZsYXQ6IEJvb2xlYW4sXG4gICAgcm91bmRlZDogQm9vbGVhbixcbiAgICBzcXVhcmU6IEJvb2xlYW4sXG4gICAgcHVzaDogQm9vbGVhbixcbiAgICBzdHJldGNoOiBCb29sZWFuLFxuICAgIGdsb3NzeTogQm9vbGVhbixcbiAgICBzcHJlYWQ6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBjbHMgPSBbICd1bmVsZXZhdGVkJywgJ291dGxpbmUnLCAnZmxhdCcsICdyb3VuZGVkJywgJ3NxdWFyZScsICdwdXNoJywgJ3N0cmV0Y2gnLCAnZ2xvc3N5JyBdXG4gICAgICAgIC5maWx0ZXIodCA9PiBwcm9wc1sgdCBdID09PSB0cnVlKVxuICAgICAgICAubWFwKHQgPT4gYHEtYnRuLWdyb3VwLS0keyB0IH1gKS5qb2luKCcgJylcblxuICAgICAgcmV0dXJuIGBxLWJ0bi1ncm91cCByb3cgbm8td3JhcCR7IGNscy5sZW5ndGggIT09IDAgPyAnICcgKyBjbHMgOiAnJyB9YFxuICAgICAgICArIChwcm9wcy5zcHJlYWQgPT09IHRydWUgPyAnIHEtYnRuLWdyb3VwLS1zcHJlYWQnIDogJyBpbmxpbmUnKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUJ0biBmcm9tICcuLi9idG4vUUJ0bi5qcydcbmltcG9ydCBRQnRuR3JvdXAgZnJvbSAnLi4vYnRuLWdyb3VwL1FCdG5Hcm91cC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5jcmVhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybUluamVjdCwgdXNlRm9ybVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlLWZvcm0vcHJpdmF0ZS51c2UtZm9ybS5qcydcblxuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcbmltcG9ydCB7IGdldEJ0bkRlc2lnbkF0dHIgfSBmcm9tICcuLi9idG4vdXNlLWJ0bi5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCdG5Ub2dnbGUnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRm9ybVByb3BzLFxuXG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiB2LmV2ZXJ5KFxuICAgICAgICBvcHQgPT4gKCdsYWJlbCcgaW4gb3B0IHx8ICdpY29uJyBpbiBvcHQgfHwgJ3Nsb3QnIGluIG9wdCkgJiYgJ3ZhbHVlJyBpbiBvcHRcbiAgICAgIClcbiAgICB9LFxuXG4gICAgLy8gVG8gYXZvaWQgc2VlaW5nIHRoZSBhY3RpdmUgcmFpc2Ugc2hhZG93IHRocm91Z2hcbiAgICAvLyB0aGUgdHJhbnNwYXJlbnQgYnV0dG9uLCBnaXZlIGl0IGEgY29sb3IgKGV2ZW4gd2hpdGUpXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcbiAgICB0b2dnbGVDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgfSxcbiAgICB0b2dnbGVUZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgZmxhdDogQm9vbGVhbixcbiAgICB1bmVsZXZhdGVkOiBCb29sZWFuLFxuICAgIHJvdW5kZWQ6IEJvb2xlYW4sXG4gICAgcHVzaDogQm9vbGVhbixcbiAgICBnbG9zc3k6IEJvb2xlYW4sXG5cbiAgICBzaXplOiBTdHJpbmcsXG4gICAgcGFkZGluZzogU3RyaW5nLFxuXG4gICAgbm9DYXBzOiBCb29sZWFuLFxuICAgIG5vV3JhcDogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICByZWFkb25seTogQm9vbGVhbixcbiAgICBkaXNhYmxlOiBCb29sZWFuLFxuXG4gICAgc3RhY2s6IEJvb2xlYW4sXG4gICAgc3RyZXRjaDogQm9vbGVhbixcblxuICAgIHNwcmVhZDogQm9vbGVhbixcblxuICAgIGNsZWFyYWJsZTogQm9vbGVhbixcblxuICAgIHJpcHBsZToge1xuICAgICAgdHlwZTogWyBCb29sZWFuLCBPYmplY3QgXSxcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2NsZWFyJywgJ2NsaWNrJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgaGFzQWN0aXZlVmFsdWUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3B0aW9ucy5maW5kKG9wdCA9PiBvcHQudmFsdWUgPT09IHByb3BzLm1vZGVsVmFsdWUpICE9PSB2b2lkIDBcbiAgICApXG5cbiAgICBjb25zdCBmb3JtQXR0cnMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgICAgdmFsdWU6IHByb3BzLm1vZGVsVmFsdWVcbiAgICB9KSlcblxuICAgIGNvbnN0IGluamVjdEZvcm1JbnB1dCA9IHVzZUZvcm1JbmplY3QoZm9ybUF0dHJzKVxuXG4gICAgY29uc3QgYnRuRGVzaWduQXR0ciA9IGNvbXB1dGVkKCgpID0+IGdldEJ0bkRlc2lnbkF0dHIocHJvcHMpKVxuXG4gICAgY29uc3QgYnRuT3B0aW9uRGVzaWduID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIHJvdW5kZWQ6IHByb3BzLnJvdW5kZWQsXG4gICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAuLi5idG5EZXNpZ25BdHRyLnZhbHVlXG4gICAgfSkpXG5cbiAgICBjb25zdCBidG5PcHRpb25zID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMub3B0aW9ucy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgIGNvbnN0IHsgYXR0cnMsIHZhbHVlLCBzbG90LCAuLi5vcHQgfSA9IGl0ZW1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2xvdCxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBrZXk6IGksXG5cbiAgICAgICAgICAnYXJpYS1wcmVzc2VkJzogdmFsdWUgPT09IHByb3BzLm1vZGVsVmFsdWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgIC4uLm9wdCxcbiAgICAgICAgICAuLi5idG5PcHRpb25EZXNpZ24udmFsdWUsXG5cbiAgICAgICAgICBkaXNhYmxlOiBwcm9wcy5kaXNhYmxlID09PSB0cnVlIHx8IG9wdC5kaXNhYmxlID09PSB0cnVlLFxuXG4gICAgICAgICAgLy8gT3B0aW9ucyB0aGF0IGNvbWUgZnJvbSB0aGUgYnV0dG9uIHNwZWNpZmljIG9wdGlvbnMgZmlyc3QsIHRoZW4gZnJvbSBnZW5lcmFsIHByb3BzXG4gICAgICAgICAgY29sb3I6IHZhbHVlID09PSBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICAgICAgICA/IG1lcmdlT3B0KG9wdCwgJ3RvZ2dsZUNvbG9yJylcbiAgICAgICAgICAgIDogbWVyZ2VPcHQob3B0LCAnY29sb3InKSxcbiAgICAgICAgICB0ZXh0Q29sb3I6IHZhbHVlID09PSBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICAgICAgICA/IG1lcmdlT3B0KG9wdCwgJ3RvZ2dsZVRleHRDb2xvcicpXG4gICAgICAgICAgICA6IG1lcmdlT3B0KG9wdCwgJ3RleHRDb2xvcicpLFxuICAgICAgICAgIG5vQ2FwczogbWVyZ2VPcHQob3B0LCAnbm9DYXBzJykgPT09IHRydWUsXG4gICAgICAgICAgbm9XcmFwOiBtZXJnZU9wdChvcHQsICdub1dyYXAnKSA9PT0gdHJ1ZSxcblxuICAgICAgICAgIHNpemU6IG1lcmdlT3B0KG9wdCwgJ3NpemUnKSxcbiAgICAgICAgICBwYWRkaW5nOiBtZXJnZU9wdChvcHQsICdwYWRkaW5nJyksXG4gICAgICAgICAgcmlwcGxlOiBtZXJnZU9wdChvcHQsICdyaXBwbGUnKSxcbiAgICAgICAgICBzdGFjazogbWVyZ2VPcHQob3B0LCAnc3RhY2snKSA9PT0gdHJ1ZSxcbiAgICAgICAgICBzdHJldGNoOiBtZXJnZU9wdChvcHQsICdzdHJldGNoJykgPT09IHRydWUsXG5cbiAgICAgICAgICBvbkNsaWNrIChlKSB7IHNldCh2YWx1ZSwgaXRlbSwgZSkgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkpXG5cbiAgICBmdW5jdGlvbiBzZXQgKHZhbHVlLCBvcHQsIGUpIHtcbiAgICAgIGlmIChwcm9wcy5yZWFkb25seSAhPT0gdHJ1ZSkge1xuICAgICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICBpZiAocHJvcHMuY2xlYXJhYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG51bGwsIG51bGwpXG4gICAgICAgICAgICBlbWl0KCdjbGVhcicpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUsIG9wdClcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZU9wdCAob3B0LCBrZXkpIHtcbiAgICAgIHJldHVybiBvcHRbIGtleSBdID09PSB2b2lkIDAgPyBwcm9wc1sga2V5IF0gOiBvcHRbIGtleSBdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IGJ0bk9wdGlvbnMudmFsdWUubWFwKG9wdCA9PiB7XG4gICAgICAgIHJldHVybiBoKFFCdG4sIG9wdC5wcm9wcywgb3B0LnNsb3QgIT09IHZvaWQgMCA/IHNsb3RzWyBvcHQuc2xvdCBdIDogdm9pZCAwKVxuICAgICAgfSlcblxuICAgICAgaWYgKHByb3BzLm5hbWUgIT09IHZvaWQgMCAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIGhhc0FjdGl2ZVZhbHVlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGluamVjdEZvcm1JbnB1dChjaGlsZCwgJ3B1c2gnKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBjaGlsZClcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4gaChRQnRuR3JvdXAsIHtcbiAgICAgIGNsYXNzOiAncS1idG4tdG9nZ2xlJyxcbiAgICAgIC4uLmJ0bkRlc2lnbkF0dHIudmFsdWUsXG4gICAgICByb3VuZGVkOiBwcm9wcy5yb3VuZGVkLFxuICAgICAgc3RyZXRjaDogcHJvcHMuc3RyZXRjaCxcbiAgICAgIGdsb3NzeTogcHJvcHMuZ2xvc3N5LFxuICAgICAgc3ByZWFkOiBwcm9wcy5zcHJlYWRcbiAgICB9LCBnZXRDb250ZW50KVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBvbkFjdGl2YXRlZCwgb25EZWFjdGl2YXRlZCwgb25Nb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UsIG5leHRUaWNrLCBwcm92aWRlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50L2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuZm9jdXMvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS5yZW5kZXIvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgZm9ybUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUuc3ltYm9scy9zeW1ib2xzLmpzJ1xuaW1wb3J0IHsgdm1Jc0Rlc3Ryb3llZCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUudm0vdm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRRm9ybScsXG5cbiAgcHJvcHM6IHtcbiAgICBhdXRvZm9jdXM6IEJvb2xlYW4sXG4gICAgbm9FcnJvckZvY3VzOiBCb29sZWFuLFxuICAgIG5vUmVzZXRGb2N1czogQm9vbGVhbixcbiAgICBncmVlZHk6IEJvb2xlYW4sXG5cbiAgICBvblN1Ym1pdDogRnVuY3Rpb25cbiAgfSxcblxuICBlbWl0czogWyAncmVzZXQnLCAndmFsaWRhdGlvblN1Y2Nlc3MnLCAndmFsaWRhdGlvbkVycm9yJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcblxuICAgIGxldCB2YWxpZGF0ZUluZGV4ID0gMFxuICAgIGNvbnN0IHJlZ2lzdGVyZWRDb21wb25lbnRzID0gW11cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlIChzaG91bGRGb2N1cykge1xuICAgICAgY29uc3QgZm9jdXMgPSB0eXBlb2Ygc2hvdWxkRm9jdXMgPT09ICdib29sZWFuJ1xuICAgICAgICA/IHNob3VsZEZvY3VzXG4gICAgICAgIDogcHJvcHMubm9FcnJvckZvY3VzICE9PSB0cnVlXG5cbiAgICAgIGNvbnN0IGluZGV4ID0gKyt2YWxpZGF0ZUluZGV4XG5cbiAgICAgIGNvbnN0IGVtaXRFdmVudCA9IChyZXMsIHJlZikgPT4ge1xuICAgICAgICBlbWl0KGB2YWxpZGF0aW9uJHsgcmVzID09PSB0cnVlID8gJ1N1Y2Nlc3MnIDogJ0Vycm9yJyB9YCwgcmVmKVxuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWxpZGF0ZUNvbXBvbmVudCA9IGNvbXAgPT4ge1xuICAgICAgICBjb25zdCB2YWxpZCA9IGNvbXAudmFsaWRhdGUoKVxuXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsaWQudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgID8gdmFsaWQudGhlbihcbiAgICAgICAgICAgIHZhbGlkID0+ICh7IHZhbGlkLCBjb21wIH0pLFxuICAgICAgICAgICAgZXJyID0+ICh7IHZhbGlkOiBmYWxzZSwgY29tcCwgZXJyIH0pXG4gICAgICAgICAgKVxuICAgICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHsgdmFsaWQsIGNvbXAgfSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXJyb3JzUHJvbWlzZSA9IHByb3BzLmdyZWVkeSA9PT0gdHJ1ZVxuICAgICAgICA/IFByb21pc2VcbiAgICAgICAgICAuYWxsKHJlZ2lzdGVyZWRDb21wb25lbnRzLm1hcCh2YWxpZGF0ZUNvbXBvbmVudCkpXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5maWx0ZXIociA9PiByLnZhbGlkICE9PSB0cnVlKSlcbiAgICAgICAgOiByZWdpc3RlcmVkQ29tcG9uZW50c1xuICAgICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgICAoYWNjLCBjb21wKSA9PiBhY2MudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0ZUNvbXBvbmVudChjb21wKS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyLnZhbGlkID09PSBmYWxzZSkgeyByZXR1cm4gUHJvbWlzZS5yZWplY3QocikgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgIClcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gWyBlcnJvciBdKVxuXG4gICAgICByZXR1cm4gZXJyb3JzUHJvbWlzZS50aGVuKGVycm9ycyA9PiB7XG4gICAgICAgIGlmIChlcnJvcnMgPT09IHZvaWQgMCB8fCBlcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaW5kZXggPT09IHZhbGlkYXRlSW5kZXggJiYgZW1pdEV2ZW50KHRydWUpXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIG5vdCBvdXRkYXRlZCBhbHJlYWR5XG4gICAgICAgIGlmIChpbmRleCA9PT0gdmFsaWRhdGVJbmRleCkge1xuICAgICAgICAgIGNvbnN0IHsgY29tcCwgZXJyIH0gPSBlcnJvcnNbIDAgXVxuXG4gICAgICAgICAgZXJyICE9PSB2b2lkIDAgJiYgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICAgICAgZW1pdEV2ZW50KGZhbHNlLCBjb21wKVxuXG4gICAgICAgICAgaWYgKGZvY3VzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAvLyBUcnkgdG8gZm9jdXMgZmlyc3QgbW91bnRlZCBhbmQgYWN0aXZlIGNvbXBvbmVudFxuICAgICAgICAgICAgY29uc3QgYWN0aXZlRXJyb3IgPSBlcnJvcnMuZmluZCgoeyBjb21wIH0pID0+IChcbiAgICAgICAgICAgICAgdHlwZW9mIGNvbXAuZm9jdXMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgJiYgdm1Jc0Rlc3Ryb3llZChjb21wLiQpID09PSBmYWxzZVxuICAgICAgICAgICAgKSlcblxuICAgICAgICAgICAgaWYgKGFjdGl2ZUVycm9yICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgYWN0aXZlRXJyb3IuY29tcC5mb2N1cygpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0VmFsaWRhdGlvbiAoKSB7XG4gICAgICB2YWxpZGF0ZUluZGV4KytcblxuICAgICAgcmVnaXN0ZXJlZENvbXBvbmVudHMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgICAgdHlwZW9mIGNvbXAucmVzZXRWYWxpZGF0aW9uID09PSAnZnVuY3Rpb24nICYmIGNvbXAucmVzZXRWYWxpZGF0aW9uKClcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3VibWl0IChldnQpIHtcbiAgICAgIGV2dCAhPT0gdm9pZCAwICYmIHN0b3BBbmRQcmV2ZW50KGV2dClcblxuICAgICAgY29uc3QgaW5kZXggPSB2YWxpZGF0ZUluZGV4ICsgMVxuXG4gICAgICB2YWxpZGF0ZSgpLnRoZW4odmFsID0+IHtcbiAgICAgICAgLy8gaWYgbm90IG91dGRhdGVkICYmIHZhbGlkYXRpb24gc3VjY2VlZGVkXG4gICAgICAgIGlmIChpbmRleCA9PT0gdmFsaWRhdGVJbmRleCAmJiB2YWwgPT09IHRydWUpIHtcbiAgICAgICAgICBpZiAocHJvcHMub25TdWJtaXQgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgZW1pdCgnc3VibWl0JywgZXZ0KVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChldnQ/LnRhcmdldCAhPT0gdm9pZCAwICYmIHR5cGVvZiBldnQudGFyZ2V0LnN1Ym1pdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZ0LnRhcmdldC5zdWJtaXQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldCAoZXZ0KSB7XG4gICAgICBldnQgIT09IHZvaWQgMCAmJiBzdG9wQW5kUHJldmVudChldnQpXG5cbiAgICAgIGVtaXQoJ3Jlc2V0JylcblxuICAgICAgbmV4dFRpY2soKCkgPT4geyAvLyBhbGxvdyB1c2VybGFuZCB0byByZXNldCB2YWx1ZXMgYmVmb3JlXG4gICAgICAgIHJlc2V0VmFsaWRhdGlvbigpXG4gICAgICAgIGlmIChwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgcHJvcHMubm9SZXNldEZvY3VzICE9PSB0cnVlKSB7XG4gICAgICAgICAgZm9jdXMoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvY3VzICgpIHtcbiAgICAgIGFkZEZvY3VzRm4oKCkgPT4ge1xuICAgICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gcm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXVt0YWJpbmRleF0sIFtkYXRhLWF1dG9mb2N1c11bdGFiaW5kZXhdJylcbiAgICAgICAgICB8fCByb290UmVmLnZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdIFt0YWJpbmRleF0sIFtkYXRhLWF1dG9mb2N1c10gW3RhYmluZGV4XScpXG4gICAgICAgICAgfHwgcm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSwgW2RhdGEtYXV0b2ZvY3VzXScpXG4gICAgICAgICAgfHwgQXJyYXkucHJvdG90eXBlLmZpbmQuY2FsbChyb290UmVmLnZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0YWJpbmRleF0nKSwgZWwgPT4gZWwudGFiSW5kZXggIT09IC0xKVxuXG4gICAgICAgIHRhcmdldD8uZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHByb3ZpZGUoZm9ybUtleSwge1xuICAgICAgYmluZENvbXBvbmVudCAodm1Qcm94eSkge1xuICAgICAgICByZWdpc3RlcmVkQ29tcG9uZW50cy5wdXNoKHZtUHJveHkpXG4gICAgICB9LFxuXG4gICAgICB1bmJpbmRDb21wb25lbnQgKHZtUHJveHkpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSByZWdpc3RlcmVkQ29tcG9uZW50cy5pbmRleE9mKHZtUHJveHkpXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICByZWdpc3RlcmVkQ29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbGV0IHNob3VsZEFjdGl2YXRlID0gZmFsc2VcblxuICAgIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgc2hvdWxkQWN0aXZhdGUgPSB0cnVlXG4gICAgfSlcblxuICAgIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIHNob3VsZEFjdGl2YXRlID09PSB0cnVlICYmIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBmb2N1cygpXG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgZm9jdXMoKVxuICAgIH0pXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHZtLnByb3h5LCB7XG4gICAgICB2YWxpZGF0ZSxcbiAgICAgIHJlc2V0VmFsaWRhdGlvbixcbiAgICAgIHN1Ym1pdCxcbiAgICAgIHJlc2V0LFxuICAgICAgZm9jdXMsXG4gICAgICBnZXRWYWxpZGF0aW9uQ29tcG9uZW50czogKCkgPT4gcmVnaXN0ZXJlZENvbXBvbmVudHNcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2Zvcm0nLCB7XG4gICAgICBjbGFzczogJ3EtZm9ybScsXG4gICAgICByZWY6IHJvb3RSZWYsXG4gICAgICBvblN1Ym1pdDogc3VibWl0LFxuICAgICAgb25SZXNldDogcmVzZXRcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgICA8cS1mb3JtIHJlZj1cImZvcm1SZWZcIiBjbGFzcz1cInEtbXQtbGdcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgICAgPHEtaW5wdXQgdi1tb2RlbD1cInRvZG9JdGVtLnRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgcmVmPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICBsYXp5LXJ1bGVzXG4gICAgICAgICAgICAgICAgICAgICA6cnVsZXM9XCJbdmFsID0+IHZhbCAmJiB2YWwubGVuZ3RoID4gMCB8fCAnUGxlYXNlIHR5cGUgc29tZXRoaW5nJ11cIlxuICAgICAgICAgICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgICAgICAgICAgIGNsZWFyYWJsZSBhdXRvZ3Jvd1xuICAgICAgICAgICAgICAgICAgICAgbWF4bGVuZ3RoPVwiNTEyXCJcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicS1tYi1sZyBmdWxsLXdpZHRoXCJcbiAgICAgICAgICAgICAgICAgICAgIGxhYmVsPVwiRGVzY3JpcHRpb24qXCJcbiAgICAgICAgICAgICAgICAgICAgIGhpbnQ9XCJXcml0ZSB3aGF0IGlzIHRvIGJlIGRvbmVcIi8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtc3VidGl0bGUxXCI+U3RhdGU8L3NwYW4+XG4gICAgICAgICAgICA8cS1idG4tdG9nZ2xlIHYtbW9kZWw9XCJ0b2RvSXRlbS5zdGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZS1jb2xvcj1cImJsdWUtMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInEtbWItbGcgZnVsbC13aWR0aFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5vLWNhcHMgc3ByZWFkXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDpvcHRpb25zPVwic3RhdGVPcHRpb25zXCIgQGNsaWNrPVwic2V0Q2hhbmdlZFwiPlxuICAgICAgICAgICAgPC9xLWJ0bi10b2dnbGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtc3VidGl0bGUxXCI+UHJpb3JpdHk8L3NwYW4+XG4gICAgICAgICAgICA8cS1idG4tdG9nZ2xlIHYtbW9kZWw9XCJ0b2RvSXRlbS5wcmlvcml0eVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZS1jb2xvcj1cIm9yYW5nZS0xMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicS1tYi1sZyBmdWxsLXdpZHRoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbm8tY2FwcyBzcHJlYWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOm9wdGlvbnM9XCJwcmlvcml0eU9wdGlvbnNcIiBAY2xpY2s9XCJzZXRDaGFuZ2VkXCIvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4gdGV4dC1zdWJ0aXRsZTFcIj5DcmVhdGVkIGF0OjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPnt7IGZvcm1hdERhdGUodG9kb0l0ZW0uY3JlYXRlZCkgfX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cganVzdGlmeS1iZXR3ZWVuIHEtcGItbWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4gdGV4dC1zdWJ0aXRsZTFcIj5DaGFuZ2VkIGF0OjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbHVtblwiPnt7IGZvcm1hdERhdGUodG9kb0l0ZW0uY2hhbmdlZCkgfX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9xLWZvcm0+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuLyoqXG4gKiBDdXN0b20gY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIGZvcm0gY29udGFpbmluZyBkYXRhIG9mIGEgc2luZ2xlIHRvZG8gaXRlbSB0byBtb2RpZnlcbiAqIEBjb3B5cmlnaHQgQWxhc2thIFNvZnR3YXJlIEluYy4gKGMpIDIwMjYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbmltcG9ydCB7Zm9ybWF0RGF0ZX0gZnJvbSBcIi4uL3V0aWxzL2Zvcm1hdHRlclwiO1xuaW1wb3J0IHtvbk1vdW50ZWQsIHJlZn0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHtnZXRTdGF0ZUF0dHJpYnV0ZXN9IGZyb20gJ3NyYy91dGlscy9kaWN0aW9uYXJ5J1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzKHtcbiAgICB0b2RvSXRlbToge1xuICAgICAgICB0eXBlOiBPYmplY3QsXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBzdGF0ZXM6IHtcbiAgICAgICAgdHlwZTogQXJyYXksXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgfSxcbiAgICBwcmlvcml0aWVzOiB7XG4gICAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH1cbn0pO1xuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICAgIGNyZWF0ZVN0YXRlT3B0aW9ucygpO1xuICAgIGNyZWF0ZVByaW9yaXR5T3B0aW9ucygpO1xufSlcblxuY29uc3Qgc3RhdGVPcHRpb25zID0gcmVmKFtdKTtcbmNvbnN0IHByaW9yaXR5T3B0aW9ucyA9IHJlZihbXSk7XG5cbmNvbnN0IGZvcm1SZWYgPSByZWYobnVsbCk7XG5cbmNvbnN0IHZhbGlkYXRlVG9kb0l0ZW0gPSBhc3luYyAoKSA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IGZvcm1SZWYudmFsdWUudmFsaWRhdGUoKTtcbn1cbmNvbnN0IGNyZWF0ZVN0YXRlT3B0aW9ucyA9ICgpID0+IHtcbiAgICBwcm9wcy5zdGF0ZXMuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiB4LmlkLFxuICAgICAgICAgICAgbGFiZWw6IHgubmFtZSxcbiAgICAgICAgICAgIGljb246IGdldFN0YXRlQXR0cmlidXRlcyh4LmlkKS5pY29uXG4gICAgICAgIH1cbiAgICAgICAgc3RhdGVPcHRpb25zLnZhbHVlLnB1c2gobmV3SXRlbSk7XG4gICAgfSlcbn1cblxuY29uc3QgY3JlYXRlUHJpb3JpdHlPcHRpb25zID0gKCkgPT4ge1xuICAgIHByb3BzLnByaW9yaXRpZXMuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiB4LmlkLFxuICAgICAgICAgICAgbGFiZWw6IHguaWQgKyBcIiBcIiArICB4Lm5hbWUsXG4gICAgICAgIH1cbiAgICAgICAgcHJpb3JpdHlPcHRpb25zLnZhbHVlLnB1c2gobmV3SXRlbSk7XG4gICAgfSk7XG59XG5cbmNvbnN0IHNldENoYW5nZWQgPSAoKSA9PiB7XG4gICAgcHJvcHMudG9kb0l0ZW0uY2hhbmdlZCA9IG5ldyBEYXRlKCk7XG59XG5cbi8vRXhwb3NlIG1ldGhvZHMgdG8gcGFyZW50IGNvbXBvbmVudHNcbmRlZmluZUV4cG9zZSh7XG4gICAgdmFsaWRhdGVUb2RvSXRlbVxufSlcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxxLWxheW91dCB2aWV3PVwiaEhoIExwciBsZmZcIj5cbiAgICAgICAgPHEtaGVhZGVyIGVsZXZhdGVkPlxuICAgICAgICAgICAgPHEtdG9vbGJhciBjbGFzcz1cImJnLWJsdWUtMTBcIj5cbiAgICAgICAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgICAgICAgICAgZmxhdCBkZW5zZSByb3VuZFxuICAgICAgICAgICAgICAgICAgICBpY29uPVwiYXJyb3dfYmFja1wiXG4gICAgICAgICAgICAgICAgICAgIHRvPVwiL1wiLz5cbiAgICAgICAgICAgICAgICA8cS10b29sYmFyLXRpdGxlPlxuICAgICAgICAgICAgICAgICAgICB7eyB0aXRsZSB9fVxuICAgICAgICAgICAgICAgIDwvcS10b29sYmFyLXRpdGxlPlxuICAgICAgICAgICAgICAgIDxxLWJ0blxuICAgICAgICAgICAgICAgICAgICB2LWlmPVwiYnV0dG9uPy5pY29uICYmIGJ1dHRvbj8uY2FsbGJhY2tcIlxuICAgICAgICAgICAgICAgICAgICBmbGF0IHJvdW5kIGRlbnNlXG4gICAgICAgICAgICAgICAgICAgIDppY29uPVwiYnV0dG9uLmljb25cIlxuICAgICAgICAgICAgICAgICAgICA6ZGlzYWJsZT1cImJ1dHRvbi5kaXNhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgQGNsaWNrPVwiYnV0dG9uLmNhbGxiYWNrXCIvPlxuICAgICAgICAgICAgPC9xLXRvb2xiYXI+XG4gICAgICAgIDwvcS1oZWFkZXI+XG4gICAgICAgIDxxLXBhZ2UtY29udGFpbmVyPlxuICAgICAgICAgICAgPHEtcGFnZSBjbGFzcz1cInEtbWEtc21cIj5cbiAgICAgICAgICAgICAgICA8c2xvdC8+XG4gICAgICAgICAgICA8L3EtcGFnZT5cbiAgICAgICAgPC9xLXBhZ2UtY29udGFpbmVyPlxuICAgIDwvcS1sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuLyoqXG4gKiBTZWNvbmRhcnkgTGF5b3V0XG4gKiBDb25zaXN0cyBvZiBhIGhlYWRlciwgdGhhdCBoYXMgYSBiYWNrIGJ1dHRvbiBuYXZpZ2F0aW5nIHRvIHRoZSBJbmRleCBwYWdlIGFuZCBhIGN1c3RvbSBidXR0b24gd2l0aCBwYXNzZWQgY2FsbGJhY2ssIGFzIHdlbGwgYXMgYSBzbG90IGZvciBhIHdyYXBwZWQgcGFnZS5cbiAqIEBjb3B5cmlnaHQgQWxhc2thIFNvZnR3YXJlIEluYy4gKGMpIDIwMjYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoe1xuICAgIHRpdGxlOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIGJ1dHRvbjoge1xuICAgICAgICB0eXBlOiBPYmplY3QsXG4gICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9XG59KTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICAgIDxzZWNvbmRhcnktbGF5b3V0IDp0aXRsZT1cImlzTmV3ID8gJ05ldyB0b2RvIGl0ZW0nIDogJ1RvZG8gSXRlbSAjJyArIGlkXCJcbiAgICAgICAgICAgICAgICAgICAgICA6YnV0dG9uPVwieyBpY29uOiAnc2F2ZScsIGNhbGxiYWNrOiBzYXZlVG9kb0l0ZW0sIGRpc2FibGU6IGlzUnVubmluZyB8fCAhIWVycm9yTWVzc2FnZSB9XCI+XG5cbiAgICAgICAgPGJhbm5lciB2LWlmPVwic2hvd0Vycm9yXCJcbiAgICAgICAgICAgICAgICA6bWVzc2FnZT1cImVycm9yTWVzc2FnZVwiIDppY29uLWNvbG9yPVwiJ29yYW5nZS0xMCdcIiA6aWNvbi1uYW1lPVwiJ3NlbnRpbWVudF92ZXJ5X2Rpc3NhdGlzZmllZCdcIlxuICAgICAgICAgICAgICAgIDpidXR0b24tbGFiZWw9XCInUmVsb2FkJ1wiIDpidXR0b24tY2FsbGJhY2s9XCJsb2FkXCIvPlxuXG4gICAgICAgIDxxLWlubmVyLWxvYWRpbmcgOnNob3dpbmc9XCJzaG93TG9hZGluZ1wiIGNvbG9yPVwiYmx1ZS0xMFwiLz5cblxuICAgICAgICA8dG9kby1pdGVtLWZvcm0gdi1pZj1cInNob3dDb250ZW50XCIgcmVmPVwidG9kb0l0ZW1Gb3JtUmVmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDp0b2RvLWl0ZW09XCJ0b2RvSXRlbVwiIDpzdGF0ZXM9XCJzdGF0ZXNcIiA6cHJpb3JpdGllcz1cInByaW9yaXRpZXNcIi8+XG5cbiAgICAgICAgPCEtLSBGbG9hdGluZyBhY3Rpb24gYnV0dG9uIGZvciBkZWxldGUgYWN0aW9uIC0tPlxuICAgICAgICA8cS1wYWdlLXN0aWNreSBwb3NpdGlvbj1cImJvdHRvbS1yaWdodFwiIDpvZmZzZXQ9XCJbMTgsIDE4XVwiPlxuICAgICAgICAgICAgPHEtYnRuIGZhYiBpY29uPVwiZGVsZXRlXCIgOmRpc2FibGU9XCJpc05ldyB8fCBpc1J1bm5pbmcgfHwgISFlcnJvck1lc3NhZ2VcIlxuICAgICAgICAgICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIiBAY2xpY2s9XCJkZWxldGlvbkRpYWxvZyA9IHRydWVcIi8+XG4gICAgICAgIDwvcS1wYWdlLXN0aWNreT5cbiAgICA8L3NlY29uZGFyeS1sYXlvdXQ+XG5cbiAgICA8cS1kaWFsb2cgdi1tb2RlbD1cImRlbGV0aW9uRGlhbG9nXCI+XG4gICAgICAgIDwhLS1UaGUgY29tcG9uZW50IGNvbmZpcm0tZGlhbG9nIGlzIGEgY3VzdG9tIGNvbXBvbmVudCB0aGF0IGFza3MgZm9yIGRlbGV0aW9uIGNvbmZpcm1hdGlvbi4tLT5cbiAgICAgICAgPCEtLUlmIHVzZXIgY29uZmlybXMgdGhlIGRlbGV0aW9uLCB0aGUgbWV0aG9kIGRlbGV0ZVRvZG9JdGVtKCkgaXMgZXhlY3V0ZWQuIC0tPlxuICAgICAgICA8Y29uZmlybS1kaWFsb2cgOmljb249XCInZGVsZXRlJ1wiIDp5ZXMtYnV0dG9uLWNhbGxiYWNrPVwiZGVsZXRlVG9kb0l0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgOm1lc3NhZ2U9XCJDT05GSVJNX01FU1NBR0VTLkRFTEVURV9UT0RPX0lURU0odG9kb0l0ZW0/LnRleHQpXCIvPlxuICAgIDwvcS1kaWFsb2c+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG4vKipcbiAqIFRvZG8gaXRlbSBwYWdlXG4gKiBSZXByZXNlbnRzIGEgZm9ybSB3aGVyZSBhIG5ldy9leGlzdGluZyB0b2RvIGl0ZW0gY2FuIGJlIGNyZWF0ZWQvbW9kaWZpZWRcbiAqIEBjb3B5cmlnaHQgQWxhc2thIFNvZnR3YXJlIEluYy4gKGMpIDIwMjYuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuaW1wb3J0IHt1c2VUb2RvSXRlbX0gZnJvbSBcInNyYy9jb21wb3NhYmxlcy90b2RvSXRlbVwiO1xuaW1wb3J0IHt1c2VSb3V0ZXJ9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5pbXBvcnQgVG9kb0l0ZW1Gb3JtIGZyb20gXCJzcmMvY29tcG9uZW50cy9Ub2RvSXRlbUZvcm0udnVlXCI7XG5pbXBvcnQgQ29uZmlybURpYWxvZyBmcm9tIFwic3JjL2NvbXBvbmVudHMvQ29uZmlybURpYWxvZy52dWVcIjtcbmltcG9ydCBCYW5uZXIgZnJvbSBcInNyYy9jb21wb25lbnRzL0Jhbm5lci52dWVcIjtcbmltcG9ydCBTZWNvbmRhcnlMYXlvdXQgZnJvbSBcInNyYy9sYXlvdXRzL1NlY29uZGFyeUxheW91dC52dWVcIjtcbmltcG9ydCB7Y29tcHV0ZWQsIHJlZn0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHtub3RpZnl9IGZyb20gJ3NyYy91dGlscy9ub3RpZnknO1xuaW1wb3J0IHtDT05GSVJNX01FU1NBR0VTLCBVSV9NRVNTQUdFU30gZnJvbSAnc3JjL2NvbnN0YW50cy9tZXNzYWdlcyc7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHMoe1xuICAgIGlkOiB7XG4gICAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9XG59KTtcblxuY29uc3QgJHJvdXRlciA9IHVzZVJvdXRlcigpO1xuY29uc3QgdG9kb0l0ZW1Gb3JtUmVmID0gcmVmKG51bGwpO1xuY29uc3Qge1xuICAgIHRvZG9JdGVtLFxuICAgIGxvYWQsXG4gICAgc2F2ZSxcbiAgICByZW1vdmUsXG4gICAgaXNOZXcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGlzRG9uZSxcbiAgICBpc1J1bm5pbmcsXG4gICAgc3RhdGVzLFxuICAgIHByaW9yaXRpZXNcbn0gPSB1c2VUb2RvSXRlbShwcm9wcy5pZCk7XG5jb25zdCBkZWxldGlvbkRpYWxvZyA9IHJlZihmYWxzZSk7XG5cbi8vIENvbXB1dGVkIHByb3BlcnRpZXMgZm9yIGNsZWFyZXIgdGVtcGxhdGUgY29uZGl0aW9uc1xuY29uc3Qgc2hvd0Vycm9yID0gY29tcHV0ZWQoKCkgPT4gaXNEb25lLnZhbHVlICYmIGVycm9yTWVzc2FnZS52YWx1ZSk7XG5jb25zdCBzaG93TG9hZGluZyA9IGNvbXB1dGVkKCgpID0+IGlzUnVubmluZy52YWx1ZSAmJiAhZXJyb3JNZXNzYWdlLnZhbHVlKTtcbmNvbnN0IHNob3dDb250ZW50ID0gY29tcHV0ZWQoKCkgPT4gaXNEb25lLnZhbHVlICYmICFlcnJvck1lc3NhZ2UudmFsdWUpO1xuXG4vKipcbiAqIE5hdmlnYXRlcyB0byB0aGUgcGFnZSBJbmRleFxuICovXG5jb25zdCBnb1RvSW5kZXggPSAoKSA9PiB7XG4gICAgJHJvdXRlci5wdXNoKHtuYW1lOiBcImluZGV4XCJ9KTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZXMgaW5wdXQgZGF0YSBhbmQgY2FsbHMgc2F2aW5nIGEgdG9kbyBpdGVtIGZyb20gdGhlIGNvbXBvc2FibGUgdXNlVG9kb0l0ZW0oKVxuICovXG5jb25zdCBzYXZlVG9kb0l0ZW0gPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgdmFsaWQgPSBhd2FpdCB0b2RvSXRlbUZvcm1SZWYudmFsdWUudmFsaWRhdGVUb2RvSXRlbSgpO1xuICAgIGlmICh2YWxpZCkge1xuICAgICAgICBhd2FpdCBzYXZlKCk7XG4gICAgICAgIG5vdGlmeSghIWVycm9yTWVzc2FnZS52YWx1ZSwgVUlfTUVTU0FHRVMuU0FWRUQsIGVycm9yTWVzc2FnZS52YWx1ZSk7XG4gICAgICAgIGlmICghZXJyb3JNZXNzYWdlLnZhbHVlKSB7XG4gICAgICAgICAgICBnb1RvSW5kZXgoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBDYWxscyBkZWxldGluZyBhIHRvZG8gaXRlbSBmcm9tIHRoZSBjb21wb3NhYmxlIHVzZVRvZG9JdGVtKClcbiAqL1xuY29uc3QgZGVsZXRlVG9kb0l0ZW0gPSBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgcmVtb3ZlKCk7XG4gICAgbm90aWZ5KCEhZXJyb3JNZXNzYWdlLnZhbHVlLCBVSV9NRVNTQUdFUy5ERUxFVEVELCBlcnJvck1lc3NhZ2UudmFsdWUpO1xuICAgIGlmICghZXJyb3JNZXNzYWdlLnZhbHVlKSB7XG4gICAgICAgIGdvVG9JbmRleCgpO1xuICAgIH1cbn1cblxuXG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJkYXRhU2VydmljZS5kZWxldGVUb2RvSXRlbUJ5SWQiLCJkYXRhU2VydmljZS5nZXRUb2RvSXRlbUJ5SWQiLCJjcmVhdGVUb2RvSXRlbSIsInVwZGF0ZVRvZG9JdGVtIiwiZGF0YVNlcnZpY2UudXBkYXRlVG9kb0l0ZW0iLCJkYXRhU2VydmljZS5jcmVhdGVUb2RvSXRlbSIsImF0dHJzIiwiZm9jdXMiLCJyZWYiLCJ2YWxpZCIsImNvbXAiLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZVZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9yZW5kZXJTbG90Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBUUEsTUFBQSxnQkFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFFSCxTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsSUFFUCxNQUFNO0FBQUEsTUFDSixNQUFNLENBQUUsUUFBUSxNQUFNO0FBQUEsTUFDdEIsU0FBUztBQUFBLElBQ2Y7QUFBQSxJQUVJLE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLFlBQVksQ0FBRSxRQUFRLE9BQU8sTUFBTTtBQUFBLEVBQ3ZDO0FBQUEsRUFFRSxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sS0FBSyxtQkFBa0I7QUFDN0IsVUFBTSxTQUFTLFFBQVEsT0FBTyxHQUFHLE1BQU0sRUFBRTtBQUV6QyxVQUFNLEVBQUUsaUJBQWlCLGdCQUFlLElBQUssY0FBYyxLQUFLO0FBRWhFLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsMkVBQ0csT0FBTyxVQUFVLE9BQU8sMkJBQTJCO0FBQUEsSUFDNUQ7QUFFSSxVQUFNLGFBQWE7QUFBQSxNQUFTLE1BQzFCLDRCQUNHLE1BQU0sZUFBZSxTQUFTLElBQUssTUFBTSxVQUFVLEtBQU07QUFBQSxJQUNsRTtBQUVJLGFBQVMsV0FBWTtBQUNuQixZQUFNLFFBQVE7QUFBQSxRQUNaLEVBQUUsVUFBVTtBQUFBLFVBQ1YsTUFBTSxNQUFNO0FBQUEsVUFDWixPQUFPLE1BQU07QUFBQSxRQUN2QixDQUFTO0FBQUEsTUFDVDtBQUVNLFVBQUksTUFBTSxVQUFVLFFBQVE7QUFDMUIsY0FBTTtBQUFBLFVBQ0osRUFBRSxPQUFPO0FBQUEsWUFDUCxPQUFPLFdBQVc7QUFBQSxZQUNsQixPQUFPLE1BQU07QUFBQSxVQUN6QixHQUFhLENBQUUsTUFBTSxLQUFLLENBQUU7QUFBQSxRQUM1QjtBQUFBLE1BQ007QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUVBLGFBQVMsYUFBYztBQUNyQixhQUFPLE1BQU0sWUFBWSxPQUNyQjtBQUFBLFFBQ0E7QUFBQSxRQUNBLEVBQUUsT0FBTyxRQUFRLE9BQU8sT0FBTyxnQkFBZ0IsTUFBSztBQUFBLFFBQ3BELE1BQU0sWUFBWSxTQUNkLE1BQU0sUUFBTyxJQUNiLFNBQVE7QUFBQSxNQUN0QixJQUNVO0FBQUEsSUFDTjtBQUVBLFdBQU8sTUFBTSxFQUFFLFlBQVksZ0JBQWdCLE9BQU8sVUFBVTtBQUFBLEVBQzlEO0FBQ0YsQ0FBQztBQ3BFTSxTQUFTLFlBQVksSUFBSTtBQUM1QixRQUFNLFdBQVcsSUFBSSxFQUFFO0FBQ3ZCLFFBQU0sZUFBZSxJQUFJLEVBQUU7QUFDM0IsUUFBTSxFQUFDLFFBQVEsVUFBUyxJQUFJLHFCQUFvQjtBQUNoRCxRQUFNLFNBQVMsSUFBSSxFQUFFO0FBQ3JCLFFBQU0sYUFBYSxJQUFJLEVBQUU7QUFDekIsUUFBTSxRQUFRLFNBQVMsTUFBTSxPQUFPLENBQUM7QUFLckMsUUFBTSxpQkFBaUIsWUFBWTtBQUMvQixjQUFVLFFBQVE7QUFDbEIsaUJBQWEsUUFBUTtBQUVyQixRQUFJO0FBQ0EsWUFBTSxXQUFXLE1BQU1BLG1CQUErQixFQUFFO0FBQ3hELG1CQUFhLFFBQVEsU0FBUyxTQUFTO0FBQUEsSUFDM0MsVUFBQztBQUNHLGdCQUFVLFFBQVE7QUFBQSxJQUN0QjtBQUFBLEVBQ0o7QUFLQSxRQUFNLGVBQWUsWUFBWTtBQUM3QixjQUFVLFFBQVE7QUFDbEIsaUJBQWEsUUFBUTtBQUVyQixRQUFJO0FBQ0EsWUFBTSxXQUFXLE1BQU1DLGdCQUE0QixFQUFFO0FBQ3JELG1CQUFhLFFBQVEsU0FBUyxTQUFTO0FBRXZDLFVBQUksU0FBUyxRQUFRO0FBQ2pCLGlCQUFTLFFBQVEsU0FBUyxPQUFPO0FBQ2pDLGVBQU8sUUFBUSxTQUFTLE9BQU8sYUFBYTtBQUM1QyxtQkFBVyxRQUFRLFNBQVMsT0FBTyxhQUFhO0FBQUEsTUFDcEQ7QUFBQSxJQUNKLFVBQUM7QUFDRyxnQkFBVSxRQUFRO0FBQUEsSUFDdEI7QUFBQSxFQUNKO0FBS0EsUUFBTSxlQUFlLFlBQVk7QUFFN0IsUUFBSSxNQUFNLE9BQU87QUFDYixZQUFNQyxpQkFBYztBQUFBLElBQ3hCLE9BQU87QUFDSCxZQUFNQyxpQkFBYztBQUFBLElBQ3hCO0FBQUEsRUFDSjtBQUtBLFFBQU1BLG1CQUFpQixZQUFZO0FBQy9CLGNBQVUsUUFBUTtBQUNsQixpQkFBYSxRQUFRO0FBRXJCLFFBQUk7QUFDQSxZQUFNLFdBQVcsTUFBTUMsZUFBMkIsU0FBUyxLQUFLO0FBQ2hFLG1CQUFhLFFBQVEsU0FBUyxTQUFTO0FBRXZDLFVBQUksU0FBUyxRQUFRO0FBQ2pCLGlCQUFTLFFBQVEsU0FBUztBQUFBLE1BQzlCO0FBQUEsSUFDSixVQUFDO0FBQ0csZ0JBQVUsUUFBUTtBQUFBLElBQ3RCO0FBQUEsRUFDSjtBQUtBLFFBQU1GLG1CQUFpQixZQUFZO0FBQy9CLGNBQVUsUUFBUTtBQUNsQixpQkFBYSxRQUFRO0FBRXJCLFFBQUk7QUFDQSxZQUFNLFdBQVcsTUFBTUcsZUFBMkIsU0FBUyxLQUFLO0FBQ2hFLG1CQUFhLFFBQVEsU0FBUyxTQUFTO0FBRXZDLFVBQUksU0FBUyxRQUFRO0FBQ2pCLGlCQUFTLFFBQVEsU0FBUztBQUFBLE1BQzlCO0FBQUEsSUFDSixVQUFDO0FBQ0csZ0JBQVUsUUFBUTtBQUFBLElBQ3RCO0FBQUEsRUFDSjtBQUdBLGdCQUFjLFlBQVk7QUFDdEIsVUFBTSxhQUFZO0FBQUEsRUFDdEIsQ0FBQztBQUVELFNBQU87QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsRUFDZDtBQUNBO0FDckhBLElBQ0UsS0FDQSxTQUFTO0FBQ1gsTUFBTSxXQUFXLElBQUksTUFBTSxHQUFHO0FBRzlCLFNBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLO0FBQzVCLFdBQVUsQ0FBQyxLQUFNLElBQUksS0FBTyxTQUFTLEVBQUUsRUFBRSxVQUFVLENBQUM7QUFDdEQ7QUFHQSxNQUFNLGVBQWUsTUFBTTtBQUV6QixRQUFNLE1BQU0sT0FBTyxXQUFXLGNBQzFCLFNBRUUsT0FBTyxXQUFXLGNBQ2QsT0FBTyxVQUFVLE9BQU8sV0FDeEI7QUFHVixNQUFJLFFBQVEsUUFBUTtBQUNsQixRQUFJLElBQUksZ0JBQWdCLFFBQVE7QUFDOUIsYUFBTyxJQUFJO0FBQUEsSUFDYjtBQUNBLFFBQUksSUFBSSxvQkFBb0IsUUFBUTtBQUNsQyxhQUFPLE9BQUs7QUFDVixjQUFNLFFBQVEsSUFBSSxXQUFXLENBQUM7QUFDOUIsWUFBSSxnQkFBZ0IsS0FBSztBQUN6QixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsU0FBTyxPQUFLO0FBQ1YsVUFBTSxJQUFJLENBQUE7QUFDVixhQUFTLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztBQUMxQixRQUFFLEtBQUssS0FBSyxNQUFNLEtBQUssT0FBTSxJQUFLLEdBQUcsQ0FBQztBQUFBLElBQ3hDO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFDRixHQUFDO0FBS0QsTUFBTSxjQUFjO0FBRUwsU0FBQSxNQUFZO0FBRXpCLE1BQUksUUFBUSxVQUFXLFNBQVMsS0FBSyxhQUFjO0FBQ2pELGFBQVM7QUFDVCxVQUFNLFlBQVksV0FBVztBQUFBLEVBQy9CO0FBRUEsUUFBTSxJQUFJLE1BQU0sVUFBVSxNQUFNLEtBQUssS0FBSyxRQUFTLFVBQVUsRUFBRTtBQUMvRCxJQUFHLENBQUMsSUFBTSxFQUFHLENBQUMsSUFBSyxLQUFRO0FBQzNCLElBQUcsQ0FBQyxJQUFNLEVBQUcsQ0FBQyxJQUFLLEtBQVE7QUFFM0IsU0FBTyxTQUFVLEVBQUcsQ0FBQyxDQUFFLElBQUssU0FBVSxFQUFHLENBQUMsQ0FBRSxJQUN4QyxTQUFVLEVBQUcsQ0FBQyxDQUFFLElBQUssU0FBVSxFQUFHLENBQUMsS0FBTyxNQUMxQyxTQUFVLEVBQUcsQ0FBQyxDQUFFLElBQUssU0FBVSxFQUFHLENBQUMsS0FBTyxNQUMxQyxTQUFVLEVBQUcsQ0FBQyxDQUFFLElBQUssU0FBVSxFQUFHLENBQUMsS0FBTyxNQUMxQyxTQUFVLEVBQUcsQ0FBQyxDQUFFLElBQUssU0FBVSxFQUFHLENBQUMsS0FBTyxNQUMxQyxTQUFVLEVBQUcsRUFBRSxDQUFFLElBQUssU0FBVSxFQUFHLEVBQUUsQ0FBRSxJQUN2QyxTQUFVLEVBQUcsRUFBRSxDQUFFLElBQUssU0FBVSxFQUFHLEVBQUUsQ0FBRSxJQUN2QyxTQUFVLEVBQUcsRUFBRSxDQUFFLElBQUssU0FBVSxFQUFHLEVBQUUsQ0FBRTtBQUM3QztBQ2pFQSxTQUFTLFdBQVksS0FBSztBQUN4QixTQUFPLFFBQVEsVUFBVSxRQUFRLE9BQzdCLE9BQ0E7QUFDTjtBQUVBLFNBQVMsTUFBTyxLQUFLLFVBQVU7QUFDN0IsU0FBTyxRQUFRLFVBQVUsUUFBUSxPQUM1QixhQUFhLE9BQU8sS0FBTSxJQUFHLENBQUUsS0FBTSxPQUN0QztBQUNOO0FBU2UsU0FBQSxNQUFVLEVBQUUsVUFBVSxXQUFXLEtBQUksSUFBSyxDQUFBLEdBQUk7QUFDM0QsTUFBSSx5QkFBeUIsVUFBVSxNQUFNO0FBQzNDLFVBQU0sS0FBSyxhQUFhLFNBQ3BCLElBQUksV0FBVyxVQUFVLENBQUMsSUFDMUIsSUFBSSxJQUFJO0FBRVosUUFBSSxhQUFhLFFBQVEsR0FBRyxVQUFVLE1BQU07QUFDMUMsZ0JBQVUsTUFBTTtBQUNkLFdBQUcsUUFBUSxLQUFNLElBQUcsQ0FBRTtBQUFBLE1BQ3hCLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxhQUFhLFFBQVE7QUFDdkIsWUFBTSxVQUFVLFdBQVM7QUFDdkIsV0FBRyxRQUFRLE1BQU0sT0FBTyxRQUFRO0FBQUEsTUFDbEMsQ0FBQztBQUFBLElBQ0g7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sYUFBYSxTQUNoQixTQUFTLE1BQU0sTUFBTSxTQUFRLEdBQUksUUFBUSxDQUFDLElBQzFDLElBQUksS0FBTSxJQUFHLENBQUUsRUFBRztBQUN4QjtBQy9DQSxNQUFNLGFBQWE7QUFFSixTQUFBLGdCQUFZO0FBQ3pCLFFBQU0sRUFBRSxPQUFPLE1BQUssSUFBSyxtQkFBa0I7QUFFM0MsUUFBTSxNQUFNO0FBQUEsSUFDVixXQUFXLElBQUksRUFBRTtBQUFBLElBQ2pCLFlBQVksSUFBSSxDQUFBLENBQUU7QUFBQSxFQUN0QjtBQUVFLFdBQVMsU0FBVTtBQUNqQixVQUFNLGFBQWEsQ0FBQTtBQUNuQixVQUFNLFlBQVksQ0FBQTtBQUVsQixlQUFXLE9BQU8sT0FBTztBQUN2QixVQUFJLFFBQVEsV0FBVyxRQUFRLFdBQVcsV0FBVyxLQUFLLEdBQUcsTUFBTSxPQUFPO0FBQ3hFLG1CQUFZLE9BQVEsTUFBTyxHQUFHO0FBQUEsTUFDaEM7QUFBQSxJQUNGO0FBRUEsZUFBVyxPQUFPLE1BQU0sT0FBTztBQUM3QixVQUFJLFdBQVcsS0FBSyxHQUFHLE1BQU0sTUFBTTtBQUNqQyxrQkFBVyxHQUFHLElBQUssTUFBTSxNQUFPLEdBQUc7QUFBQSxNQUNyQztBQUFBLElBQ0Y7QUFFQSxRQUFJLFdBQVcsUUFBUTtBQUN2QixRQUFJLFVBQVUsUUFBUTtBQUFBLEVBQ3hCO0FBRUEsaUJBQWUsTUFBTTtBQUVyQixTQUFNO0FBRU4sU0FBTztBQUNUO0FDakNlLFNBQUEsYUFBVSxFQUFFLFVBQVUsaUJBQWlCLGlCQUFpQjtBQUNyRSxRQUFNLFFBQVEsT0FBTyxTQUFTLEtBQUs7QUFFbkMsTUFBSSxVQUFVLE9BQU87QUFDbkIsVUFBTSxFQUFFLE9BQU8sTUFBSyxJQUFLLG1CQUFrQjtBQUczQyxXQUFPLE9BQU8sT0FBTyxFQUFFLFVBQVUsZ0JBQWUsQ0FBRTtBQUVsRCxVQUFNLE1BQU0sTUFBTSxTQUFTLFNBQU87QUFDaEMsVUFBSSxRQUFRLE1BQU07QUFDaEIsZUFBTyxvQkFBb0IsY0FBYyxnQkFBZTtBQUN4RCxjQUFNLGdCQUFnQixLQUFLO0FBQUEsTUFDN0IsT0FDSztBQUNILGNBQU0sY0FBYyxLQUFLO0FBQUEsTUFDM0I7QUFBQSxJQUNGLENBQUM7QUFFRCxjQUFVLE1BQU07QUFFZCxZQUFNLFlBQVksUUFBUSxNQUFNLGNBQWMsS0FBSztBQUFBLElBQ3JELENBQUM7QUFFRCxvQkFBZ0IsTUFBTTtBQUVwQixZQUFNLFlBQVksUUFBUSxNQUFNLGdCQUFnQixLQUFLO0FBQUEsSUFDdkQsQ0FBQztBQUFBLEVBQ0gsV0FDUyxrQkFBa0IsTUFBTTtBQUMvQixZQUFRLE1BQU0sMkNBQTJDO0FBQUEsRUFDM0Q7QUFDRjtBQ2xDQSxNQUNFLE1BQU0sc0NBQ04sT0FBTyxzQ0FDUCxZQUFZLG9FQUNaLE1BQU0seUhBQ04sT0FBTztBQUdGLE1BQU0sY0FBYztBQUFBLEVBQ3pCLE1BQU0sT0FBSyw4QkFBOEIsS0FBSyxDQUFDO0FBQUEsRUFDL0MsTUFBTSxPQUFLLDhCQUE4QixLQUFLLENBQUM7QUFBQSxFQUMvQyxVQUFVLE9BQUssc0NBQXNDLEtBQUssQ0FBQztBQUFBLEVBQzNELGdCQUFnQixPQUFLLHlDQUF5QyxLQUFLLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFwRSxPQUFPLE9BQUsseUpBQXlKLEtBQUssQ0FBQztBQUFBLEVBRTNLLFVBQVUsT0FBSyxJQUFJLEtBQUssQ0FBQztBQUFBLEVBQ3pCLFdBQVcsT0FBSyxLQUFLLEtBQUssQ0FBQztBQUFBLEVBQzNCLGdCQUFnQixPQUFLLFVBQVUsS0FBSyxDQUFDO0FBQUEsRUFFckMsVUFBVSxPQUFLLElBQUksS0FBSyxDQUFDO0FBQUEsRUFDekIsV0FBVyxPQUFLLEtBQUssS0FBSyxDQUFDO0FBQUEsRUFDM0IsZ0JBQWdCLE9BQUssSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztBQUFBLEVBRS9DLGVBQWUsT0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO0FBQUEsRUFDN0MsaUJBQWlCLE9BQUssS0FBSyxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztBQUFBLEVBQ2pELFVBQVUsT0FBSyxVQUFVLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUM7QUFDaEU7QUM1QkEsTUFBTSxrQkFBa0IsQ0FBRSxNQUFNLE9BQU8sVUFBVTtBQUUxQyxNQUFNLG1CQUFtQjtBQUFBLEVBQzlCLFlBQVksQ0FBQTtBQUFBLEVBRVosT0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ2I7QUFBQSxFQUNFLGNBQWM7QUFBQSxFQUNkLGFBQWE7QUFBQSxFQUViLE9BQU87QUFBQSxFQUNQLGVBQWU7QUFBQSxFQUNmLFdBQVc7QUFBQSxJQUNULE1BQU0sQ0FBRSxTQUFTLE1BQU07QUFBQSxJQUN2QixTQUFTO0FBQUE7QUFBQSxJQUNULFdBQVcsT0FBSyxnQkFBZ0IsU0FBUyxDQUFDO0FBQUEsRUFDOUM7QUFDQTtBQUVlLFNBQUEsWUFBVSxTQUFTLGNBQWM7QUFDOUMsUUFBTSxFQUFFLE9BQU8sTUFBSyxJQUFLLG1CQUFrQjtBQUUzQyxRQUFNLGFBQWEsSUFBSSxLQUFLO0FBQzVCLFFBQU0sb0JBQW9CLElBQUksSUFBSTtBQUNsQyxRQUFNLGVBQWUsSUFBSSxLQUFLO0FBRTlCLGVBQWEsRUFBRSxVQUFVLGdCQUFlLENBQUU7QUFFMUMsTUFBSSxnQkFBZ0IsR0FBRztBQUV2QixRQUFNLFdBQVc7QUFBQSxJQUFTLE1BQ3hCLE1BQU0sVUFBVSxVQUNiLE1BQU0sVUFBVSxRQUNoQixNQUFNLE1BQU0sV0FBVztBQUFBLEVBQzlCO0FBRUUsUUFBTSxzQkFBc0IsU0FBUyxNQUNuQyxNQUFNLFlBQVksUUFDZixTQUFTLFVBQVUsUUFJbkIsYUFBYSxVQUFVLEtBQzNCO0FBRUQsUUFBTSxXQUFXO0FBQUEsSUFBUyxNQUN4QixNQUFNLFVBQVUsUUFBUSxXQUFXLFVBQVU7QUFBQSxFQUNqRDtBQUVFLFFBQU0sZUFBZSxTQUFTLE1BQzVCLE9BQU8sTUFBTSxpQkFBaUIsWUFBWSxNQUFNLGFBQWEsV0FBVyxJQUNwRSxNQUFNLGVBQ04sa0JBQWtCLEtBQ3ZCO0FBRUQsUUFBTSxNQUFNLE1BQU0sWUFBWSxNQUFNO0FBQ2xDLGlCQUFhLFFBQVE7QUFFckIsUUFDRSxvQkFBb0IsVUFBVSxRQUUzQixNQUFNLGNBQWMsT0FDdkI7QUFDQSx3QkFBaUI7QUFBQSxJQUNuQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFdBQVMsZ0JBQWlCO0FBQ3hCLFFBQ0UsTUFBTSxjQUFjLGNBQ2pCLG9CQUFvQixVQUFVLFFBQzlCLGFBQWEsVUFBVSxNQUMxQjtBQUNBLHdCQUFpQjtBQUFBLElBQ25CO0FBQUEsRUFDRjtBQUVBLFFBQU0sTUFBTSxNQUFNLGVBQWUsU0FBTztBQUN0QyxRQUFJLFFBQVEsTUFBTTtBQUNoQixVQUFJLGlCQUFpQixRQUFRO0FBQzNCLHVCQUFlLE1BQU0sTUFBTSxNQUFNLE9BQU8sZUFBZSxFQUFFLFdBQVcsTUFBTSxNQUFNLEtBQUksQ0FBRTtBQUFBLE1BQ3hGO0FBQUEsSUFDRixXQUNTLGlCQUFpQixRQUFRO0FBQ2hDLG1CQUFZO0FBQ1oscUJBQWU7QUFBQSxJQUNqQjtBQUFBLEVBQ0YsR0FBRyxFQUFFLFdBQVcsS0FBSSxDQUFFO0FBRXRCLFFBQU0sTUFBTSxNQUFNLFdBQVcsYUFBYTtBQUUxQyxRQUFNLFNBQVMsU0FBTztBQUNwQixRQUFJLFFBQVEsTUFBTTtBQUNoQixtQkFBYSxRQUFRO0FBQUEsSUFDdkIsV0FFRSxvQkFBb0IsVUFBVSxRQUMzQixNQUFNLGNBQWMsWUFDdkI7QUFDQSx3QkFBaUI7QUFBQSxJQUNuQjtBQUFBLEVBQ0YsQ0FBQztBQUVELFdBQVMsa0JBQW1CO0FBQzFCO0FBQ0EsaUJBQWEsUUFBUTtBQUNyQixpQkFBYSxRQUFRO0FBQ3JCLGVBQVcsUUFBUTtBQUNuQixzQkFBa0IsUUFBUTtBQUMxQixzQkFBa0IsT0FBTTtBQUFBLEVBQzFCO0FBUUEsV0FBUyxTQUFVLE1BQU0sTUFBTSxZQUFZO0FBQ3pDLFFBQ0UsTUFBTSxZQUFZLFFBQ2YsU0FBUyxVQUFVLE9BQ3RCO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLFFBQVEsRUFBRTtBQUVoQixVQUFNLFdBQVcsYUFBYSxVQUFVLE9BQ3BDLE1BQU07QUFBRSxtQkFBYSxRQUFRO0FBQUEsSUFBSyxJQUNsQyxNQUFNO0FBQUEsSUFBQztBQUVYLFVBQU0sU0FBUyxDQUFDLEtBQUssUUFBUTtBQUMzQixjQUFRLFFBQVEsU0FBUTtBQUV4QixpQkFBVyxRQUFRO0FBQ25CLHdCQUFrQixRQUFRLE9BQU87QUFDakMsbUJBQWEsUUFBUTtBQUFBLElBQ3ZCO0FBRUEsVUFBTSxXQUFXLENBQUE7QUFFakIsYUFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLE1BQU0sUUFBUSxLQUFLO0FBQzNDLFlBQU0sT0FBTyxNQUFNLE1BQU8sQ0FBQztBQUMzQixVQUFJO0FBRUosVUFBSSxPQUFPLFNBQVMsWUFBWTtBQUM5QixjQUFNLEtBQUssS0FBSyxXQUFXO0FBQUEsTUFDN0IsV0FDUyxPQUFPLFNBQVMsWUFBWSxZQUFhLElBQUksTUFBTyxRQUFRO0FBQ25FLGNBQU0sWUFBYSxJQUFJLEVBQUcsR0FBRztBQUFBLE1BQy9CO0FBRUEsVUFBSSxRQUFRLFNBQVMsT0FBTyxRQUFRLFVBQVU7QUFDNUMsZUFBTyxNQUFNLEdBQUc7QUFDaEIsZUFBTztBQUFBLE1BQ1QsV0FDUyxRQUFRLFFBQVEsUUFBUSxRQUFRO0FBQ3ZDLGlCQUFTLEtBQUssR0FBRztBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUVBLFFBQUksU0FBUyxXQUFXLEdBQUc7QUFDekIsYUFBTyxLQUFLO0FBQ1osYUFBTztBQUFBLElBQ1Q7QUFFQSxpQkFBYSxRQUFRO0FBRXJCLFdBQU8sUUFBUSxJQUFJLFFBQVEsRUFBRTtBQUFBLE1BQzNCLFNBQU87QUFDTCxZQUFJLFFBQVEsVUFBVSxNQUFNLFFBQVEsR0FBRyxNQUFNLFNBQVMsSUFBSSxXQUFXLEdBQUc7QUFDdEUsb0JBQVUsaUJBQWlCLE9BQU8sS0FBSztBQUN2QyxpQkFBTztBQUFBLFFBQ1Q7QUFFQSxjQUFNLE1BQU0sSUFBSSxLQUFLLE9BQUssTUFBTSxTQUFTLE9BQU8sTUFBTSxRQUFRO0FBQzlELGtCQUFVLGlCQUFpQixPQUFPLFFBQVEsUUFBUSxHQUFHO0FBQ3JELGVBQU8sUUFBUTtBQUFBLE1BQ2pCO0FBQUEsTUFDQSxPQUFLO0FBQ0gsWUFBSSxVQUFVLGVBQWU7QUFDM0Isa0JBQVEsTUFBTSxDQUFDO0FBQ2YsaUJBQU8sSUFBSTtBQUFBLFFBQ2I7QUFFQSxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ047QUFBQSxFQUNFO0FBRUEsUUFBTSxvQkFBb0IsU0FBUyxVQUFVLENBQUM7QUFFOUMsa0JBQWdCLE1BQU07QUFDcEIsbUJBQVk7QUFDWixzQkFBa0IsT0FBTTtBQUFBLEVBQzFCLENBQUM7QUFHRCxTQUFPLE9BQU8sT0FBTyxFQUFFLGlCQUFpQixTQUFRLENBQUU7QUFDbEQsYUFBVyxPQUFPLFlBQVksTUFBTSxTQUFTLEtBQUs7QUFFbEQsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUVBO0FBQUEsSUFDQTtBQUFBLEVBQ0o7QUFDQTtBQzlNTyxTQUFTLG1CQUFvQixLQUFLO0FBQ3ZDLFNBQU8sUUFBUSxVQUNWLFFBQVEsU0FDUCxLQUFLLEtBQUssV0FBVztBQUM3QjtBQUVPLE1BQU0sd0JBQXdCO0FBQUEsRUFDbkMsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBRUgsT0FBTztBQUFBLEVBQ1AsWUFBWTtBQUFBLEVBQ1osTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBRVIsWUFBWTtBQUFBLEVBQ1osT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBRVQsUUFBUTtBQUFBLEVBQ1IsVUFBVTtBQUFBLEVBQ1YsWUFBWTtBQUFBLEVBQ1osVUFBVSxDQUFFLFNBQVMsTUFBTTtBQUFBLEVBRTNCLFFBQVE7QUFBQSxFQUVSLFNBQVM7QUFBQSxFQUVULFdBQVc7QUFBQSxFQUVYLGFBQWE7QUFBQSxFQUNiLGlCQUFpQjtBQUFBLEVBRWpCLFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUViLFNBQVM7QUFBQSxFQUVULFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUVYLFNBQVM7QUFBQSxFQUNULFVBQVU7QUFBQSxFQUVWLFdBQVc7QUFBQSxFQUVYLEtBQUs7QUFDUDtBQUVPLE1BQU0sZ0JBQWdCO0FBQUEsRUFDM0IsR0FBRztBQUFBLEVBQ0gsV0FBVyxDQUFFLFFBQVEsTUFBTTtBQUM3QjtBQUVPLE1BQU0sZ0JBQWdCLENBQUUscUJBQXFCLFNBQVMsU0FBUyxNQUFNO0FBRXJFLFNBQVMsY0FBZSxFQUFFLGtCQUFrQixNQUFNLFNBQVMsY0FBYyxNQUFLLElBQUssSUFBSTtBQUM1RixRQUFNLEVBQUUsT0FBTyxNQUFLLElBQUssbUJBQWtCO0FBRTNDLFFBQU0sU0FBUyxRQUFRLE9BQU8sTUFBTSxFQUFFO0FBQ3RDLFFBQU0sWUFBWSxNQUFNO0FBQUEsSUFDdEIsVUFBVTtBQUFBLElBQ1YsVUFBVSxNQUFNLE1BQU07QUFBQSxFQUMxQixDQUFHO0FBRUQsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQSxLQUFLLFlBQVksT0FDYixTQUFTLE1BQU0sTUFBTSxHQUFHLElBQ3hCLEVBQUUsT0FBTyxRQUFPO0FBQUEsSUFFcEI7QUFBQSxJQUVBLFVBQVU7QUFBQSxNQUFTLE1BQ2pCLE1BQU0sWUFBWSxRQUFRLE1BQU0sYUFBYTtBQUFBLElBQ25EO0FBQUEsSUFFSSxjQUFjLElBQUksS0FBSztBQUFBLElBQ3ZCLFNBQVMsSUFBSSxLQUFLO0FBQUEsSUFDbEIsY0FBYztBQUFBLElBRWQsWUFBWSxjQUFhO0FBQUEsSUFDekI7QUFBQSxJQUVBLFNBQVMsSUFBSSxJQUFJO0FBQUEsSUFDakIsV0FBVyxJQUFJLElBQUk7QUFBQSxJQUNuQixZQUFZLElBQUksSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBb0J4QjtBQUNBO0FBRWUsU0FBQSxTQUFVLE9BQU87QUFDOUIsUUFBTSxFQUFFLE9BQU8sTUFBTSxPQUFPLE9BQU8sTUFBSyxJQUFLLG1CQUFrQjtBQUMvRCxRQUFNLEVBQUUsR0FBRSxJQUFLO0FBRWYsTUFBSSxnQkFBZ0I7QUFFcEIsTUFBSSxNQUFNLGFBQWEsUUFBUTtBQUM3QixVQUFNLFdBQVcsU0FBUyxNQUFNLG1CQUFtQixNQUFNLFVBQVUsQ0FBQztBQUFBLEVBQ3RFO0FBRUEsTUFBSSxNQUFNLGNBQWMsUUFBUTtBQUM5QixVQUFNLFlBQVksV0FBUztBQUN6QixXQUFLLHFCQUFxQixLQUFLO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBRUEsTUFBSSxNQUFNLGtCQUFrQixRQUFRO0FBQ2xDLFVBQU0sZ0JBQWdCO0FBQUEsTUFDcEIsV0FBVztBQUFBLE1BQ1gsWUFBWTtBQUFBLElBQ2xCO0FBQUEsRUFDRTtBQUVBLFNBQU8sT0FBTyxPQUFPO0FBQUEsSUFDbkI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNKLENBQUc7QUFFRCxNQUFJLE1BQU0sb0JBQW9CLFFBQVE7QUFDcEMsVUFBTSxrQkFBa0IsU0FBUyxNQUFNO0FBQ3JDLFVBQUksTUFBTSxZQUFZLE9BQU87QUFDM0IsY0FBTSxNQUFNLE9BQU8sTUFBTSxlQUFlLFlBQVksT0FBTyxNQUFNLGVBQWUsWUFDM0UsS0FBSyxNQUFNLFlBQVksU0FDdkIsTUFBTSxRQUFRLE1BQU0sVUFBVSxNQUFNLE9BQU8sTUFBTSxXQUFXLFNBQVM7QUFFMUUsY0FBTSxNQUFNLE1BQU0sY0FBYyxTQUM1QixNQUFNLFlBQ04sTUFBTTtBQUVWLGVBQU8sT0FBTyxRQUFRLFNBQVMsUUFBUSxNQUFNO0FBQUEsTUFDL0M7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBRUEsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDSixJQUFNLFlBQVksTUFBTSxTQUFTLE1BQU0sWUFBWTtBQUVqRCxRQUFNLGdCQUFnQixNQUFNLGtCQUFrQixTQUMxQyxTQUFTLE1BQU0sTUFBTSxlQUFlLFFBQVEsTUFBTSxRQUFRLFVBQVUsUUFBUSxNQUFNLGNBQWMsVUFBVSxJQUFJLElBQzlHLFNBQVMsTUFBTSxNQUFNLGVBQWUsUUFBUSxNQUFNLFFBQVEsVUFBVSxRQUFRLE1BQU0sU0FBUyxVQUFVLElBQUk7QUFFN0csUUFBTSxxQkFBcUI7QUFBQSxJQUFTLE1BQ2xDLE1BQU0sZ0JBQWdCLFFBQ25CLE1BQU0sU0FBUyxVQUNmLFNBQVMsVUFBVSxRQUNuQixNQUFNLFlBQVksUUFDbEIsTUFBTSxVQUFVO0FBQUEsRUFDdkI7QUFFRSxRQUFNLFlBQVksU0FBUyxNQUFNO0FBQy9CLFFBQUksTUFBTSxXQUFXLE1BQU07QUFBRSxhQUFPO0FBQUEsSUFBUztBQUM3QyxRQUFJLE1BQU0sYUFBYSxNQUFNO0FBQUUsYUFBTztBQUFBLElBQVc7QUFDakQsUUFBSSxNQUFNLGVBQWUsTUFBTTtBQUFFLGFBQU87QUFBQSxJQUFhO0FBQ3JELFFBQUksTUFBTSxVQUFVO0FBQUUsYUFBTztBQUFBLElBQVc7QUFDeEMsV0FBTztBQUFBLEVBQ1QsQ0FBQztBQUVELFFBQU0sVUFBVTtBQUFBLElBQVMsTUFDdkIsNENBQTZDLFVBQVUsS0FBSyxNQUN6RCxNQUFNLGVBQWUsU0FBUyxJQUFLLE1BQU0sV0FBVyxLQUFLLEtBQU0sT0FDL0QsTUFBTSxZQUFZLE9BQU8sc0JBQXNCLE9BQy9DLE1BQU0sV0FBVyxPQUFPLHFCQUFxQixPQUM3QyxjQUFjLFVBQVUsT0FBTyxvQkFBb0IsT0FDbkQsU0FBUyxVQUFVLE9BQU8sc0JBQXNCLE9BQ2hELE1BQU0sVUFBVSxPQUFPLG9CQUFvQixPQUMzQyxNQUFNLGdCQUFnQixPQUFPLHVDQUF1QyxPQUNwRSxNQUFNLE9BQU8sVUFBVSxPQUFPLG1CQUFtQixPQUNqRCxNQUFNLGVBQWUsU0FBUywwQkFBMEIsT0FDeEQsTUFBTSxRQUFRLFVBQVUsT0FBTyxzQkFBc0IsT0FDckQsU0FBUyxVQUFVLE9BQU8sb0JBQW9CLE9BQzlDLFNBQVMsVUFBVSxRQUFRLE1BQU0sUUFBUSxVQUFVLE9BQU8sMEJBQTBCLE9BQ3BGLE1BQU0sb0JBQW9CLFFBQVEsbUJBQW1CLFVBQVUsT0FBTywwQkFBMEIsT0FDaEcsTUFBTSxZQUFZLE9BQU8sdUJBQXdCLE1BQU0sYUFBYSxPQUFPLHVCQUF1QjtBQUFBLEVBQ3pHO0FBRUUsUUFBTSxlQUFlO0FBQUEsSUFBUyxNQUM1QixvREFDRyxNQUFNLFlBQVksU0FBUyxPQUFRLE1BQU0sT0FBTyxLQUFNLE9BRXZELFNBQVMsVUFBVSxPQUNmLG1CQUVFLE9BQU8sTUFBTSxhQUFhLFlBQVksTUFBTSxTQUFTLFdBQVcsS0FBSyxNQUFNLFFBQVEsVUFBVSxPQUN6RixJQUFLLE1BQU0sUUFBUSxLQUNsQixNQUFNLFVBQVUsU0FBUyxTQUFVLE1BQU0sS0FBSyxLQUFNO0FBQUEsRUFHckU7QUFFRSxRQUFNLFdBQVc7QUFBQSxJQUFTLE1BQ3hCLE1BQU0sY0FBYyxRQUFRLE1BQU0sVUFBVTtBQUFBLEVBQ2hEO0FBRUUsUUFBTSxhQUFhO0FBQUEsSUFBUyxNQUMxQix3REFDRyxNQUFNLGVBQWUsVUFBVSxTQUFTLFVBQVUsT0FBTyxTQUFVLE1BQU0sVUFBVSxLQUFNO0FBQUEsRUFDaEc7QUFFRSxRQUFNLG1CQUFtQixTQUFTLE9BQU87QUFBQSxJQUN2QyxJQUFJLE1BQU0sVUFBVTtBQUFBLElBQ3BCLFVBQVUsTUFBTSxTQUFTO0FBQUEsSUFDekIsU0FBUyxNQUFNLFFBQVE7QUFBQSxJQUN2QixlQUFlLGNBQWM7QUFBQSxJQUM3QixZQUFZLE1BQU07QUFBQSxJQUNsQixXQUFXLE1BQU07QUFBQSxFQUNyQixFQUFJO0FBRUYsUUFBTSxhQUFhLFNBQVMsTUFBTTtBQUNoQyxVQUFNLE1BQU0sQ0FBQTtBQUVaLFFBQUksTUFBTSxVQUFVLE9BQU87QUFDekIsVUFBSSxNQUFNLE1BQU0sVUFBVTtBQUFBLElBQzVCO0FBRUEsUUFBSSxNQUFNLFlBQVksTUFBTTtBQUMxQixVQUFLLGVBQWUsSUFBSztBQUFBLElBQzNCO0FBRUEsV0FBTztBQUFBLEVBQ1QsQ0FBQztBQUVELFdBQVMsZUFBZ0I7QUFDdkIsVUFBTSxLQUFLLFNBQVM7QUFDcEIsUUFBSSxTQUFTLE1BQU0sV0FBVztBQUU5QixRQUFJLFdBQVcsT0FBTyxRQUFRLEdBQUcsT0FBTyxNQUFNLFVBQVUsUUFBUTtBQUM5RCxhQUFPLGFBQWEsVUFBVSxNQUFNLFNBQVMsU0FBUyxPQUFPLGNBQWMsWUFBWTtBQUN2RixVQUFJLFdBQVcsSUFBSTtBQUNqQixnQkFBUSxNQUFNLEVBQUUsZUFBZSxLQUFJLENBQUU7QUFBQSxNQUN2QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsV0FBUyxRQUFTO0FBQ2hCLGVBQVcsWUFBWTtBQUFBLEVBQ3pCO0FBRUEsV0FBUyxPQUFRO0FBQ2Ysa0JBQWMsWUFBWTtBQUMxQixVQUFNLEtBQUssU0FBUztBQUNwQixRQUFJLE9BQU8sUUFBUSxNQUFNLFFBQVEsTUFBTSxTQUFTLEVBQUUsR0FBRztBQUNuRCxTQUFHLEtBQUk7QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUVBLFdBQVMsaUJBQWtCLEdBQUc7QUFDNUIsUUFBSSxrQkFBa0IsTUFBTTtBQUMxQixtQkFBYSxhQUFhO0FBQzFCLHNCQUFnQjtBQUFBLElBQ2xCO0FBRUEsUUFBSSxNQUFNLFNBQVMsVUFBVSxRQUFRLE1BQU0sUUFBUSxVQUFVLE9BQU87QUFDbEUsWUFBTSxRQUFRLFFBQVE7QUFDdEIsV0FBSyxTQUFTLENBQUM7QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFFQSxXQUFTLGtCQUFtQixHQUFHLE1BQU07QUFDbkMsc0JBQWtCLFFBQVEsYUFBYSxhQUFhO0FBQ3BELG9CQUFnQixXQUFXLE1BQU07QUFDL0Isc0JBQWdCO0FBRWhCLFVBQ0UsU0FBUyxTQUFRLE1BQU8sU0FDdEIsTUFBTSxpQkFBaUIsUUFDcEIsTUFBTSxlQUFlLFVBQ3JCLE1BQU0sV0FBVyxVQUFVLFFBQzNCLE1BQU0sV0FBVyxNQUFNLFNBQVMsU0FBUyxhQUFhLE1BQU0sT0FFakU7QUFFRixVQUFJLE1BQU0sUUFBUSxVQUFVLE1BQU07QUFDaEMsY0FBTSxRQUFRLFFBQVE7QUFDdEIsYUFBSyxRQUFRLENBQUM7QUFBQSxNQUNoQjtBQUVBLGFBQUk7QUFBQSxJQUNOLENBQUM7QUFBQSxFQUNIO0FBRUEsV0FBUyxXQUFZLEdBQUc7QUFFdEIsbUJBQWUsQ0FBQztBQUVoQixRQUFJLEdBQUcsU0FBUyxHQUFHLFdBQVcsTUFBTTtBQUNsQyxZQUFNLEtBQUssTUFBTSxXQUFXLFNBQVMsTUFBTSxRQUFRO0FBQ25ELFNBQUcsTUFBSztBQUFBLElBQ1YsV0FDUyxNQUFNLFFBQVEsTUFBTSxTQUFTLFNBQVMsYUFBYSxNQUFNLE1BQU07QUFDdEUsZUFBUyxjQUFjLEtBQUk7QUFBQSxJQUM3QjtBQUVBLFFBQUksTUFBTSxTQUFTLFFBQVE7QUFJekIsWUFBTSxTQUFTLE1BQU0sUUFBUTtBQUFBLElBQy9CO0FBRUEsU0FBSyxxQkFBcUIsSUFBSTtBQUM5QixVQUFNLGdCQUFnQixRQUFRLEtBQUssVUFBVSxJQUFJO0FBQ2pELFNBQUssU0FBUyxNQUFNLFVBQVU7QUFFOUIsYUFBUyxNQUFNO0FBQ2IsWUFBTSxVQUFVLGFBQWE7QUFDN0Isc0JBQWU7QUFDZixtQkFBYSxRQUFRO0FBQUEsSUFDdkIsQ0FBQztBQUFBLEVBQ0g7QUFFQSxXQUFTLGlCQUFrQixLQUFLO0FBQzlCLEtBQUUsSUFBSSxJQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssV0FBVyxHQUFHO0FBQUEsRUFDcEQ7QUFFQSxXQUFTLGFBQWM7QUFDckIsVUFBTSxPQUFPLENBQUE7QUFFYixVQUFNLFlBQVksVUFBVSxLQUFLO0FBQUEsTUFDL0IsRUFBRSxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxLQUFLO0FBQUEsUUFDTCxTQUFTO0FBQUEsTUFDakIsR0FBUyxNQUFNLFFBQU8sQ0FBRTtBQUFBLElBQ3hCO0FBRUksU0FBSztBQUFBLE1BQ0gsRUFBRSxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsTUFDZixHQUFTLG9CQUFtQixDQUFFO0FBQUEsSUFDOUI7QUFFSSxhQUFTLFVBQVUsUUFBUSxNQUFNLGdCQUFnQixTQUFTLEtBQUs7QUFBQSxNQUM3RCxtQkFBbUIsU0FBUztBQUFBLFFBQzFCLEVBQUUsT0FBTyxFQUFFLE1BQU0sR0FBRyxRQUFRLE1BQU0sT0FBTyxPQUFPLFdBQVUsQ0FBRTtBQUFBLE1BQ3BFLENBQU87QUFBQSxJQUNQO0FBRUksUUFBSSxNQUFNLFlBQVksUUFBUSxNQUFNLGFBQWEsVUFBVSxNQUFNO0FBQy9ELFdBQUs7QUFBQSxRQUNIO0FBQUEsVUFDRTtBQUFBLFVBQ0EsTUFBTSxZQUFZLFNBQ2QsTUFBTSxRQUFPLElBQ2IsQ0FBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLE1BQU0sTUFBSyxDQUFFLENBQUM7QUFBQSxRQUNuRDtBQUFBLE1BQ0E7QUFBQSxJQUNJLFdBQ1MsTUFBTSxjQUFjLFFBQVEsTUFBTSxTQUFTLFVBQVUsUUFBUSxNQUFNLFNBQVMsVUFBVSxNQUFNO0FBQ25HLFdBQUs7QUFBQSxRQUNILG1CQUFtQiwwQkFBMEI7QUFBQSxVQUMzQyxFQUFFLE9BQU87QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLE1BQU0sTUFBTSxhQUFhLEdBQUcsUUFBUSxNQUFNO0FBQUEsWUFDMUMsVUFBVTtBQUFBLFlBQ1YsTUFBTTtBQUFBLFlBQ04sZUFBZTtBQUFBLFlBQ2YsY0FBYyxHQUFHLEtBQUssTUFBTTtBQUFBLFlBQzVCLFNBQVM7QUFBQSxZQUNULFNBQVM7QUFBQSxVQUNyQixDQUFXO0FBQUEsUUFDWCxDQUFTO0FBQUEsTUFDVDtBQUFBLElBQ0k7QUFFQSxVQUFNLFdBQVcsVUFBVSxLQUFLO0FBQUEsTUFDOUIsRUFBRSxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxLQUFLO0FBQUEsUUFDTCxTQUFTO0FBQUEsTUFDakIsR0FBUyxNQUFNLE9BQU0sQ0FBRTtBQUFBLElBQ3ZCO0FBRUksVUFBTSxtQkFBbUIsVUFBVSxLQUFLO0FBQUEsTUFDdEMsbUJBQW1CLGdCQUFnQixNQUFNLGVBQWMsQ0FBRTtBQUFBLElBQy9EO0FBRUksVUFBTSxvQkFBb0IsVUFBVSxLQUFLO0FBQUEsTUFDdkMsTUFBTSxnQkFBZTtBQUFBLElBQzNCO0FBRUksV0FBTztBQUFBLEVBQ1Q7QUFFQSxXQUFTLHNCQUF1QjtBQUM5QixVQUFNLE9BQU8sQ0FBQTtBQUViLFVBQU0sV0FBVyxVQUFVLE1BQU0sV0FBVyxRQUFRLEtBQUs7QUFBQSxNQUN2RCxFQUFFLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxNQUNmLEdBQVMsTUFBTSxNQUFNO0FBQUEsSUFDckI7QUFFSSxRQUFJLE1BQU0scUJBQXFCLFVBQVUsTUFBTSxVQUFVLFVBQVUsTUFBTTtBQUN2RSxXQUFLO0FBQUEsUUFDSCxNQUFNLGlCQUFnQjtBQUFBLE1BQzlCO0FBQUEsSUFDSTtBQUVBLGFBQVMsVUFBVSxRQUFRLEtBQUs7QUFBQSxNQUM5QixFQUFFLE9BQU87QUFBQSxRQUNQLE9BQU8sV0FBVztBQUFBLE1BQzFCLEdBQVMsTUFBTSxNQUFNLE9BQU8sTUFBTSxLQUFLLENBQUM7QUFBQSxJQUN4QztBQUVJLFFBQUksTUFBTSxlQUFlLFFBQVE7QUFDL0IsV0FBSyxLQUFLLE1BQU0sV0FBVSxDQUFFO0FBQUEsSUFDOUIsV0FFUyxNQUFNLGVBQWUsUUFBUTtBQUNwQyxXQUFLLEtBQUssTUFBTSxXQUFVLENBQUU7QUFBQSxJQUM5QixXQUNTLE1BQU0sWUFBWSxRQUFRO0FBQ2pDLFdBQUs7QUFBQSxRQUNILEVBQUUsT0FBTztBQUFBLFVBQ1AsS0FBSyxNQUFNO0FBQUEsVUFDWCxPQUFPO0FBQUEsVUFDUCxVQUFVO0FBQUEsVUFDVixHQUFHLE1BQU0sV0FBVyxXQUFXO0FBQUEsVUFDL0Isa0JBQWtCLE1BQU0sY0FBYyxRQUFRO0FBQUEsUUFDeEQsR0FBVyxNQUFNLFFBQVEsaUJBQWlCLEtBQUssQ0FBQztBQUFBLE1BQ2hEO0FBQUEsSUFDSTtBQUVBLFVBQU0sV0FBVyxVQUFVLE1BQU0sV0FBVyxRQUFRLEtBQUs7QUFBQSxNQUN2RCxFQUFFLE9BQU87QUFBQSxRQUNQLE9BQU87QUFBQSxNQUNmLEdBQVMsTUFBTSxNQUFNO0FBQUEsSUFDckI7QUFFSSxXQUFPLEtBQUssT0FBTyxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDekM7QUFFQSxXQUFTLFlBQWE7QUFDcEIsUUFBSSxLQUFLO0FBRVQsUUFBSSxTQUFTLFVBQVUsTUFBTTtBQUMzQixVQUFJLGFBQWEsVUFBVSxNQUFNO0FBQy9CLGNBQU0sQ0FBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLFFBQU8sR0FBSSxhQUFhLEtBQUssQ0FBQztBQUN2RCxjQUFNLGlCQUFrQixhQUFhLEtBQUs7QUFBQSxNQUM1QyxPQUNLO0FBQ0gsY0FBTSxNQUFNLE1BQU0sS0FBSztBQUN2QixjQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0YsV0FDUyxNQUFNLGFBQWEsUUFBUSxNQUFNLFFBQVEsVUFBVSxNQUFNO0FBQ2hFLFVBQUksTUFBTSxTQUFTLFFBQVE7QUFDekIsY0FBTSxDQUFFLEVBQUUsT0FBTyxNQUFNLElBQUksQ0FBQztBQUM1QixjQUFNLGdCQUFpQixNQUFNLElBQUk7QUFBQSxNQUNuQyxPQUNLO0FBQ0gsY0FBTSxNQUFNLE1BQU0sSUFBSTtBQUN0QixjQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGFBQWEsTUFBTSxZQUFZLFFBQVEsTUFBTSxZQUFZO0FBRS9ELFFBQ0UsTUFBTSxvQkFBb0IsUUFDdkIsZUFBZSxTQUNmLFFBQVEsT0FDWDtBQUVGLFVBQU0sT0FBTyxFQUFFLE9BQU87QUFBQSxNQUNwQjtBQUFBLE1BQ0EsT0FBTztBQUFBLElBQ2IsR0FBTyxHQUFHO0FBRU4sV0FBTyxFQUFFLE9BQU87QUFBQSxNQUNkLE9BQU8sdURBQ0YsTUFBTSxvQkFBb0IsT0FBTyxhQUFhO0FBQUEsTUFDbkQsU0FBUztBQUFBLElBQ2YsR0FBTztBQUFBLE1BQ0QsTUFBTSxvQkFBb0IsT0FDdEIsT0FDQSxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE2QixHQUFJLE1BQU0sSUFBSTtBQUFBLE1BRXJFLGVBQWUsT0FDWCxFQUFFLE9BQU87QUFBQSxRQUNULE9BQU87QUFBQSxNQUNqQixHQUFXLE1BQU0sWUFBWSxTQUFTLE1BQU0sWUFBWSxNQUFNLGdCQUFnQixLQUFLLElBQ3pFO0FBQUEsSUFDVixDQUFLO0FBQUEsRUFDSDtBQUVBLFdBQVMsbUJBQW9CLEtBQUssU0FBUztBQUN6QyxXQUFPLFlBQVksT0FDZixPQUNBLEVBQUUsT0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLE9BQU87QUFBQSxJQUNmLEdBQVMsT0FBTztBQUFBLEVBQ2Q7QUFFQSxNQUFJLGlCQUFpQjtBQUVyQixnQkFBYyxNQUFNO0FBQ2xCLHFCQUFpQjtBQUFBLEVBQ25CLENBQUM7QUFFRCxjQUFZLE1BQU07QUFDaEIsdUJBQW1CLFFBQVEsTUFBTSxjQUFjLFFBQVEsTUFBTSxNQUFLO0FBQUEsRUFDcEUsQ0FBQztBQUVELFFBQU0sY0FBYyxRQUFRLFVBQVUsTUFBTTtBQUMxQyxVQUFNLE1BQUs7QUFBQSxFQUNiLENBQUM7QUFFRCxrQkFBZ0IsTUFBTTtBQUNwQixzQkFBa0IsUUFBUSxhQUFhLGFBQWE7QUFBQSxFQUN0RCxDQUFDO0FBR0QsU0FBTyxPQUFPLE9BQU8sRUFBRSxPQUFPLEtBQUksQ0FBRTtBQUVwQyxTQUFPLFNBQVMsY0FBZTtBQUM3QixVQUFNLGFBQWEsTUFBTSxlQUFlLFVBQVUsTUFBTSxZQUFZLFNBQ2hFO0FBQUEsTUFDRSxHQUFHLE1BQU0sV0FBVyxXQUFXO0FBQUEsTUFDL0Isa0JBQWtCLE1BQU0sY0FBYyxRQUFRO0FBQUEsTUFDOUMsR0FBRyxXQUFXO0FBQUEsSUFDeEIsSUFDUSxXQUFXO0FBRWYsV0FBTyxFQUFFLE1BQU0sSUFBSSxPQUFPO0FBQUEsTUFDeEIsS0FBSyxNQUFNO0FBQUEsTUFDWCxPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFDUixNQUFNO0FBQUEsTUFDZDtBQUFBLE1BQ00sT0FBTyxNQUFNO0FBQUEsTUFDYixHQUFHO0FBQUEsSUFDVCxHQUFPO0FBQUEsTUFDRCxNQUFNLFdBQVcsU0FDYixFQUFFLE9BQU87QUFBQSxRQUNULE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxNQUNuQixHQUFXLE1BQU0sT0FBTSxDQUFFLElBQ2Y7QUFBQSxNQUVKLEVBQUUsT0FBTztBQUFBLFFBQ1AsT0FBTztBQUFBLE1BQ2YsR0FBUztBQUFBLFFBQ0QsRUFBRSxPQUFPO0FBQUEsVUFDUCxLQUFLLE1BQU07QUFBQSxVQUNYLE9BQU8sYUFBYTtBQUFBLFVBQ3BCLFVBQVU7QUFBQSxVQUNWLEdBQUcsTUFBTTtBQUFBLFFBQ25CLEdBQVcsV0FBVSxDQUFFO0FBQUEsUUFFZixtQkFBbUIsVUFBVSxPQUN6QixVQUFTLElBQ1Q7QUFBQSxNQUNaLENBQU87QUFBQSxNQUVELE1BQU0sVUFBVSxTQUNaLEVBQUUsT0FBTztBQUFBLFFBQ1QsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLE1BQ25CLEdBQVcsTUFBTSxNQUFLLENBQUUsSUFDZDtBQUFBLElBQ1YsQ0FBSztBQUFBLEVBQ0g7QUFDRjtBQzNsQkEsTUFBTSxjQUFjO0FBQUEsRUFDbEIsTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLEVBQ1YsTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLEVBQ1YsT0FBTztBQUFBLEVBQ1AsTUFBTTtBQUNSO0FBRUEsTUFBTSxFQUFFLFVBQVUsbUJBQW1CLFdBQVcsdUJBQXNCLElBQUssWUFBWTtBQUFBLEVBQ3JGLEtBQUssRUFBRSxTQUFTLFNBQVMsUUFBUSxTQUFRO0FBQUEsRUFFekMsR0FBRyxFQUFFLFNBQVMsWUFBWSxRQUFRLFlBQVc7QUFBQSxFQUM3QyxHQUFHLEVBQUUsU0FBUyxlQUFlLFFBQVEsZUFBYztBQUFBLEVBRW5ELEdBQUcsRUFBRSxTQUFTLFlBQVksUUFBUSxhQUFhLFdBQVcsT0FBSyxFQUFFLG9CQUFtQjtBQUFBLEVBQ3BGLEdBQUcsRUFBRSxTQUFTLFlBQVksUUFBUSxhQUFhLFdBQVcsT0FBSyxFQUFFLG9CQUFtQjtBQUFBLEVBRXBGLEdBQUcsRUFBRSxTQUFTLGVBQWUsUUFBUSxnQkFBZ0IsV0FBVyxPQUFLLEVBQUUsb0JBQW1CO0FBQUEsRUFDMUYsR0FBRyxFQUFFLFNBQVMsZUFBZSxRQUFRLGdCQUFnQixXQUFXLE9BQUssRUFBRSxrQkFBaUIsRUFBRTtBQUM1RixDQUFDO0FBRUQsU0FBUyxZQUFhLFFBQVE7QUFDNUIsUUFBTSxZQUFZLE9BQU8sS0FBSyxNQUFNO0FBQ3BDLFFBQU0sV0FBVyxDQUFBO0FBRWpCLFlBQVUsUUFBUSxTQUFPO0FBQ3ZCLFVBQU0sUUFBUSxPQUFRLEdBQUc7QUFDekIsYUFBVSxHQUFHLElBQUs7QUFBQSxNQUNoQixHQUFHO0FBQUEsTUFDSCxPQUFPLElBQUksT0FBTyxNQUFNLE9BQU87QUFBQSxJQUNyQztBQUFBLEVBQ0UsQ0FBQztBQUVELFNBQU8sRUFBRSxVQUFVLFVBQVM7QUFDOUI7QUFFQSxTQUFTLGtCQUFtQixNQUFNO0FBQ2hDLFNBQU8sSUFBSSxPQUFPLHFEQUFxRCxLQUFLLEtBQUssRUFBRSxJQUFJLFVBQVUsR0FBRztBQUN0RztBQUVBLE1BQU0sV0FBVztBQUNqQixNQUFNLDJCQUEyQixrQkFBa0Isc0JBQXNCO0FBQ3pFLE1BQU0sU0FBUyxPQUFPLGFBQWEsQ0FBQztBQUU3QixNQUFNLGVBQWU7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixpQkFBaUI7QUFBQSxFQUNqQixVQUFVLENBQUUsU0FBUyxNQUFNO0FBQUEsRUFDM0IsZUFBZTtBQUFBLEVBQ2YsWUFBWTtBQUNkO0FBRWUsU0FBQSxRQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVU7QUFDekQsTUFBSSxZQUFZLGNBQWMsY0FBYyxnQkFBZ0IsaUJBQWlCO0FBRTdFLFFBQU0sU0FBUyxTQUFTLE1BQU07QUFDNUIsUUFBSSxNQUFNLGVBQWUsVUFBVSxNQUFNLGVBQWUsTUFBTTtBQUM1RCxhQUFPO0FBQUEsUUFDTCxVQUFVO0FBQUEsUUFDVixnQkFBZ0I7QUFBQSxNQUN4QjtBQUFBLElBQ0k7QUFFQSxVQUFNLEVBQUUsVUFBVSxhQUFZLElBQUssWUFBWSxNQUFNLFVBQVU7QUFDL0QsVUFBTSxXQUFXO0FBQUEsTUFDZixHQUFHO0FBQUEsTUFDSCxHQUFHO0FBQUEsSUFDVDtBQUVJLFdBQU87QUFBQSxNQUNMO0FBQUEsTUFDQSxnQkFBZ0Isa0JBQWtCLE9BQU8sS0FBSyxRQUFRLENBQUM7QUFBQSxJQUM3RDtBQUFBLEVBQ0UsQ0FBQztBQUVELFFBQU0sVUFBVSxJQUFJLElBQUk7QUFDeEIsUUFBTSxhQUFhLElBQUksc0JBQXFCLENBQUU7QUFFOUMsV0FBUyxnQkFBaUI7QUFDeEIsV0FBTyxNQUFNLGFBQWEsUUFDckIsQ0FBRSxZQUFZLFFBQVEsVUFBVSxPQUFPLE9BQU8sVUFBVSxFQUFHLFNBQVMsTUFBTSxJQUFJO0FBQUEsRUFDckY7QUFFQSxRQUFNLE1BQU0sTUFBTSxPQUFPLE1BQU0sVUFBVSxtQkFBbUI7QUFFNUQsUUFBTSxNQUFNLE1BQU0sTUFBTSxPQUFLO0FBQzNCLFFBQUksTUFBTSxRQUFRO0FBQ2hCLHNCQUFnQixXQUFXLE9BQU8sSUFBSTtBQUFBLElBQ3hDLE9BQ0s7QUFDSCxZQUFNLE1BQU0sWUFBWSxXQUFXLEtBQUs7QUFDeEMsMEJBQW1CO0FBQ25CLFlBQU0sZUFBZSxPQUFPLEtBQUsscUJBQXFCLEdBQUc7QUFBQSxJQUMzRDtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sTUFBTSxNQUFNLFdBQVcsTUFBTSxpQkFBaUIsTUFBTTtBQUN4RCxZQUFRLFVBQVUsUUFBUSxnQkFBZ0IsV0FBVyxPQUFPLElBQUk7QUFBQSxFQUNsRSxDQUFDO0FBRUQsUUFBTSxNQUFNLE1BQU0sZUFBZSxNQUFNO0FBQ3JDLFlBQVEsVUFBVSxRQUFRLGdCQUFnQixXQUFXLEtBQUs7QUFBQSxFQUM1RCxDQUFDO0FBRUQsV0FBUyx3QkFBeUI7QUFDaEMsd0JBQW1CO0FBRW5CLFFBQUksUUFBUSxVQUFVLE1BQU07QUFDMUIsWUFBTSxTQUFTLFVBQVUsWUFBWSxNQUFNLFVBQVUsQ0FBQztBQUV0RCxhQUFPLE1BQU0sYUFBYSxRQUN0QixhQUFhLE1BQU0sSUFDbkI7QUFBQSxJQUNOO0FBRUEsV0FBTyxNQUFNO0FBQUEsRUFDZjtBQUVBLFdBQVMsb0JBQXFCLE1BQU07QUFDbEMsUUFBSSxPQUFPLFdBQVcsUUFBUTtBQUM1QixhQUFPLFdBQVcsTUFBTSxDQUFDLElBQUk7QUFBQSxJQUMvQjtBQUVBLFFBQUksTUFBTSxJQUFJLGtCQUFrQjtBQUNoQyxVQUFNLFNBQVMsZ0JBQWdCLFFBQVEsTUFBTTtBQUU3QyxRQUFJLFdBQVcsSUFBSTtBQUNqQixlQUFTLElBQUksT0FBTyxnQkFBZ0IsUUFBUSxJQUFJLEdBQUcsS0FBSztBQUN0RCxlQUFPO0FBQUEsTUFDVDtBQUVBLHdCQUFrQixnQkFBZ0IsTUFBTSxHQUFHLE1BQU0sSUFBSSxNQUFNLGdCQUFnQixNQUFNLE1BQU07QUFBQSxJQUN6RjtBQUVBLFdBQU87QUFBQSxFQUNUO0FBRUEsV0FBUyxzQkFBdUI7QUFDOUIsWUFBUSxRQUFRLE1BQU0sU0FBUyxVQUMxQixNQUFNLEtBQUssV0FBVyxLQUN0QixjQUFhO0FBRWxCLFFBQUksUUFBUSxVQUFVLE9BQU87QUFDM0IsdUJBQWlCO0FBQ2pCLG1CQUFhO0FBQ2IscUJBQWU7QUFDZjtBQUFBLElBQ0Y7QUFFQSxVQUNFLG9CQUFvQixZQUFhLE1BQU0sVUFBVyxTQUM5QyxNQUFNLE9BQ04sWUFBYSxNQUFNLElBQUksR0FDM0IsV0FBVyxPQUFPLE1BQU0sYUFBYSxZQUFZLE1BQU0sU0FBUyxXQUFXLElBQ3ZFLE1BQU0sU0FBUyxNQUFNLEdBQUcsQ0FBQyxJQUN6QixLQUNKLGtCQUFrQixTQUFTLFFBQVEsVUFBVSxNQUFNLEdBQ25ELFNBQVMsQ0FBQSxHQUNULFVBQVUsQ0FBQSxHQUNWLE9BQU8sQ0FBQTtBQUVULFFBQ0UsYUFBYSxNQUFNLG9CQUFvQixNQUN2QyxhQUFhLElBQ2IsYUFBYTtBQUVmLHNCQUFrQixRQUFRLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQyxHQUFHLE9BQU8sS0FBSyxPQUFPLFVBQVU7QUFDdEYsVUFBSSxVQUFVLFFBQVE7QUFDcEIsY0FBTSxJQUFJLE9BQU8sTUFBTSxTQUFVLEtBQUs7QUFDdEMsYUFBSyxLQUFLLENBQUM7QUFDWCxxQkFBYSxFQUFFO0FBQ2YsWUFBSSxlQUFlLE1BQU07QUFDdkIsa0JBQVEsS0FBSyxRQUFRLGFBQWEsU0FBUyxFQUFFLFVBQVUsV0FBVyxhQUFhLFNBQVMsRUFBRSxVQUFVLEtBQUs7QUFDekcsdUJBQWE7QUFBQSxRQUNmO0FBQ0EsZ0JBQVEsS0FBSyxRQUFRLGFBQWEsU0FBUyxFQUFFLFVBQVUsSUFBSTtBQUFBLE1BQzdELFdBQ1MsUUFBUSxRQUFRO0FBQ3ZCLHFCQUFhLFFBQVEsUUFBUSxPQUFPLEtBQUs7QUFDekMsYUFBSyxLQUFLLEdBQUc7QUFDYixlQUFPLEtBQUssUUFBUSxhQUFhLFNBQVMsYUFBYSxHQUFHO0FBQUEsTUFDNUQsT0FDSztBQUNILGNBQU0sSUFBSSxVQUFVLFNBQVMsUUFBUTtBQUNyQyxxQkFBYSxNQUFNLE9BQU8sYUFBYSxFQUFFLFFBQVEsVUFBVSxRQUFRO0FBQ25FLGFBQUssS0FBSyxDQUFDO0FBQ1gsZUFBTyxLQUFLLFFBQVEsYUFBYSxTQUFTLGFBQWEsR0FBRztBQUFBLE1BQzVEO0FBQUEsSUFDRixDQUFDO0FBRUQsVUFDRSxnQkFBZ0IsSUFBSTtBQUFBLE1BQ2xCLE1BQ0UsT0FBTyxLQUFLLEVBQUUsSUFDZCxPQUFPLGVBQWUsS0FBSyxNQUFNLE9BQU8sYUFBYSxPQUFPLFNBQzNELGVBQWUsS0FBSyxLQUFLLE1BQU0sYUFBYSxRQUFRO0FBQUEsSUFDL0QsR0FDTSxjQUFjLFFBQVEsU0FBUyxHQUMvQixpQkFBaUIsUUFBUSxJQUFJLENBQUMsSUFBSSxVQUFVO0FBQzFDLFVBQUksVUFBVSxLQUFLLE1BQU0sb0JBQW9CLE1BQU07QUFDakQsZUFBTyxJQUFJLE9BQU8sTUFBTSxrQkFBa0IsTUFBTSxFQUFFO0FBQUEsTUFDcEQsV0FDUyxVQUFVLGFBQWE7QUFDOUIsZUFBTyxJQUFJO0FBQUEsVUFDVCxNQUFNLEtBQ0osT0FBTyxlQUFlLEtBQUssTUFBTSxjQUFjLFNBQzlDLE1BQU0sb0JBQW9CLE9BQU8sTUFBTSxrQkFBa0I7QUFBQSxRQUN4RTtBQUFBLE1BQ1E7QUFFQSxhQUFPLElBQUksT0FBTyxNQUFNLEVBQUU7QUFBQSxJQUM1QixDQUFDO0FBRUgsbUJBQWU7QUFDZixxQkFBaUIsU0FBTztBQUN0QixZQUFNLGNBQWMsY0FBYyxLQUFLLE1BQU0sb0JBQW9CLE9BQU8sTUFBTSxJQUFJLE1BQU0sR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQzNHLFVBQUksZ0JBQWdCLE1BQU07QUFDeEIsY0FBTSxZQUFZLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRTtBQUFBLE1BQ3BDO0FBRUEsWUFDRSxlQUFlLENBQUEsR0FDZix1QkFBdUIsZUFBZTtBQUV4QyxlQUFTLElBQUksR0FBRyxNQUFNLEtBQUssSUFBSSxzQkFBc0IsS0FBSztBQUN4RCxjQUFNLElBQUksZUFBZ0IsQ0FBQyxFQUFHLEtBQUssR0FBRztBQUV0QyxZQUFJLE1BQU0sTUFBTTtBQUNkO0FBQUEsUUFDRjtBQUVBLGNBQU0sSUFBSSxNQUFNLEVBQUUsTUFBSyxFQUFHLE1BQU07QUFDaEMscUJBQWEsS0FBSyxHQUFHLENBQUM7QUFBQSxNQUN4QjtBQUNBLFVBQUksYUFBYSxXQUFXLEdBQUc7QUFDN0IsZUFBTyxhQUFhLEtBQUssRUFBRTtBQUFBLE1BQzdCO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFDQSxpQkFBYSxLQUFLLElBQUksT0FBTSxPQUFPLE1BQU0sV0FBVyxJQUFJLE1BQU8sRUFBRSxLQUFLLEVBQUU7QUFDeEUsbUJBQWUsV0FBVyxNQUFNLE1BQU0sRUFBRSxLQUFLLFFBQVE7QUFBQSxFQUN2RDtBQUVBLFdBQVMsZ0JBQWlCLFFBQVEseUJBQXlCLFdBQVc7QUFDcEUsVUFDRSxNQUFNLFNBQVMsT0FDZixNQUFNLElBQUksY0FDVixhQUFhLElBQUksTUFBTSxTQUFTLEtBQ2hDLFdBQVcsWUFBWSxNQUFNO0FBRy9CLGdDQUE0QixRQUFRLG9CQUFtQjtBQUV2RCxVQUNFLFlBQVksVUFBVSxVQUFVLHVCQUF1QixHQUN2RCxTQUFTLE1BQU0sYUFBYSxRQUN4QixhQUFhLFNBQVMsSUFDdEIsV0FDSixVQUFVLFdBQVcsVUFBVTtBQUdqQyxRQUFJLFVBQVUsV0FBVyxJQUFJLFFBQVE7QUFFckMsZ0JBQVksU0FBUyxXQUFXLFFBQVE7QUFFeEMsYUFBUyxrQkFBa0IsT0FBTyxTQUFTLE1BQU07QUFDL0MsVUFBSSxXQUFXLGNBQWM7QUFDM0IsY0FBTSxTQUFTLE1BQU0sb0JBQW9CLE9BQU8sYUFBYSxTQUFTO0FBQ3RFLFlBQUksa0JBQWtCLFFBQVEsUUFBUSxTQUFTO0FBQy9DO0FBQUEsTUFDRjtBQUVBLFVBQUksY0FBYyxxQkFBcUIsTUFBTSxvQkFBb0IsTUFBTTtBQUNyRSxjQUFNLFNBQVMsSUFBSTtBQUNuQixZQUFJLFNBQVMsTUFBTTtBQUVuQixpQkFBUyxJQUFJLGlCQUFpQixLQUFLLFVBQVUsSUFBSSxRQUFRLEtBQUs7QUFDNUQsY0FBSSxXQUFZLENBQUMsTUFBTyxRQUFRO0FBQzlCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFFQSxtQkFBVyxNQUFNLEtBQUssTUFBTTtBQUM1QjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLENBQUUseUJBQXlCLHNCQUFzQixFQUFHLFFBQVEsU0FBUyxNQUFNLElBQUk7QUFDakYsY0FBTSxTQUFTLE1BQU0sb0JBQW9CLE9BRW5DLFFBQVEsSUFDSCxPQUFPLFNBQVMsVUFBVSxTQUFTLElBQUksSUFDeEMsS0FBSyxJQUFJLEdBQUcsT0FBTyxVQUFVLFdBQVcsZUFBZSxJQUFJLEtBQUssSUFBSSxVQUFVLFFBQVEsVUFBVSxJQUFJLEVBQUUsSUFBSSxJQUVoSDtBQUVKLFlBQUksa0JBQWtCLFFBQVEsUUFBUSxTQUFTO0FBQy9DO0FBQUEsTUFDRjtBQUVBLFVBQUksTUFBTSxvQkFBb0IsTUFBTTtBQUNsQyxZQUFJLFlBQVksTUFBTTtBQUNwQixnQkFBTSxTQUFTLEtBQUssSUFBSSxHQUFHLE9BQU8sVUFBVSxXQUFXLGVBQWUsSUFBSSxLQUFLLElBQUksVUFBVSxRQUFRLGFBQWEsQ0FBQyxFQUFFO0FBRXJILGNBQUksV0FBVyxLQUFLLFFBQVEsR0FBRztBQUM3QixnQkFBSSxrQkFBa0IsUUFBUSxRQUFRLFNBQVM7QUFBQSxVQUNqRCxPQUNLO0FBQ0gsdUJBQVcsYUFBYSxLQUFLLE1BQU07QUFBQSxVQUNyQztBQUFBLFFBQ0YsT0FDSztBQUNILGdCQUFNLFNBQVMsT0FBTyxTQUFTO0FBQy9CLGNBQUksa0JBQWtCLFFBQVEsUUFBUSxVQUFVO0FBQUEsUUFDbEQ7QUFBQSxNQUNGLE9BQ0s7QUFDSCxZQUFJLFlBQVksTUFBTTtBQUNwQixnQkFBTSxTQUFTLEtBQUssSUFBSSxHQUFHLFdBQVcsUUFBUSxNQUFNLEdBQUcsS0FBSyxJQUFJLFVBQVUsUUFBUSxHQUFHLElBQUksQ0FBQztBQUMxRixxQkFBVyxNQUFNLEtBQUssTUFBTTtBQUFBLFFBQzlCLE9BQ0s7QUFDSCxnQkFBTSxTQUFTLE1BQU07QUFDckIscUJBQVcsTUFBTSxLQUFLLE1BQU07QUFBQSxRQUM5QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFFRCxVQUFNLE1BQU0sTUFBTSxrQkFBa0IsT0FDaEMsWUFBWSxNQUFNLElBQ2xCO0FBRUosUUFDRSxPQUFPLE1BQU0sVUFBVSxNQUFNLFFBQ3pCLE1BQU0sZUFBZSxRQUFRLFFBQVEsS0FDekM7QUFDQSxnQkFBVSxLQUFLLElBQUk7QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFFQSxXQUFTLG1CQUFvQixLQUFLLE9BQU8sS0FBSztBQUM1QyxVQUFNLFlBQVksVUFBVSxZQUFZLElBQUksS0FBSyxDQUFDO0FBRWxELFlBQVEsS0FBSyxJQUFJLEdBQUcsV0FBVyxRQUFRLE1BQU0sR0FBRyxLQUFLLElBQUksVUFBVSxRQUFRLEtBQUssQ0FBQztBQUNqRixzQkFBa0I7QUFFbEIsUUFBSSxrQkFBa0IsT0FBTyxLQUFLLFNBQVM7QUFBQSxFQUM3QztBQUVBLFFBQU0sYUFBYTtBQUFBLElBQ2pCLEtBQU0sS0FBSyxRQUFRO0FBQ2pCLFlBQU0sZUFBZSxXQUFXLE1BQU0sU0FBUyxDQUFDLEVBQUUsUUFBUSxNQUFNLE1BQU07QUFDdEUsVUFBSSxJQUFJLEtBQUssSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUU5QixhQUFPLEtBQUssR0FBRyxLQUFLO0FBQ2xCLFlBQUksV0FBWSxDQUFDLE1BQU8sUUFBUTtBQUM5QixtQkFBUztBQUNULDJCQUFpQixRQUFRO0FBQ3pCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFFQSxVQUNFLElBQUksS0FDRCxXQUFZLE1BQU0sTUFBTyxVQUN6QixXQUFZLE1BQU0sTUFBTyxRQUM1QjtBQUNBLGVBQU8sV0FBVyxNQUFNLEtBQUssQ0FBQztBQUFBLE1BQ2hDO0FBRUEsZ0JBQVUsS0FBSyxJQUFJLGtCQUFrQixRQUFRLFFBQVEsVUFBVTtBQUFBLElBQ2pFO0FBQUEsSUFFQSxNQUFPLEtBQUssUUFBUTtBQUNsQixZQUFNLFFBQVEsSUFBSSxNQUFNO0FBQ3hCLFVBQUksSUFBSSxLQUFLLElBQUksT0FBTyxTQUFTLENBQUM7QUFFbEMsYUFBTyxLQUFLLE9BQU8sS0FBSztBQUN0QixZQUFJLFdBQVksQ0FBQyxNQUFPLFFBQVE7QUFDOUIsbUJBQVM7QUFDVDtBQUFBLFFBQ0YsV0FDUyxXQUFZLElBQUksQ0FBQyxNQUFPLFFBQVE7QUFDdkMsbUJBQVM7QUFBQSxRQUNYO0FBQUEsTUFDRjtBQUVBLFVBQ0UsSUFBSSxTQUNELFdBQVksU0FBUyxPQUFRLFVBQzdCLFdBQVksU0FBUyxPQUFRLFFBQ2hDO0FBQ0EsZUFBTyxXQUFXLEtBQUssS0FBSyxLQUFLO0FBQUEsTUFDbkM7QUFFQSxVQUFJLGtCQUFrQixRQUFRLFFBQVEsU0FBUztBQUFBLElBQ2pEO0FBQUEsSUFFQSxZQUFhLEtBQUssUUFBUTtBQUN4QixZQUNFLGtCQUFrQixvQkFBb0IsSUFBSSxNQUFNLE1BQU07QUFDeEQsVUFBSSxJQUFJLEtBQUssSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUU5QixhQUFPLEtBQUssR0FBRyxLQUFLO0FBQ2xCLFlBQUksZ0JBQWlCLElBQUksQ0FBQyxNQUFPLFFBQVE7QUFDdkMsbUJBQVM7QUFDVDtBQUFBLFFBQ0YsV0FDUyxnQkFBaUIsQ0FBQyxNQUFPLFFBQVE7QUFDeEMsbUJBQVM7QUFDVCxjQUFJLE1BQU0sR0FBRztBQUNYO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsVUFDRSxJQUFJLEtBQ0QsZ0JBQWlCLE1BQU0sTUFBTyxVQUM5QixnQkFBaUIsTUFBTSxNQUFPLFFBQ2pDO0FBQ0EsZUFBTyxXQUFXLGFBQWEsS0FBSyxDQUFDO0FBQUEsTUFDdkM7QUFFQSxnQkFBVSxLQUFLLElBQUksa0JBQWtCLFFBQVEsUUFBUSxVQUFVO0FBQUEsSUFDakU7QUFBQSxJQUVBLGFBQWMsS0FBSyxRQUFRO0FBQ3pCLFlBQ0UsUUFBUSxJQUFJLE1BQU0sUUFDbEIsa0JBQWtCLG9CQUFvQixLQUFLLEdBQzNDLGVBQWUsZ0JBQWdCLE1BQU0sR0FBRyxTQUFTLENBQUMsRUFBRSxRQUFRLE1BQU0sTUFBTTtBQUMxRSxVQUFJLElBQUksS0FBSyxJQUFJLE9BQU8sU0FBUyxDQUFDO0FBRWxDLGFBQU8sS0FBSyxPQUFPLEtBQUs7QUFDdEIsWUFBSSxnQkFBaUIsSUFBSSxDQUFDLE1BQU8sUUFBUTtBQUN2QyxtQkFBUztBQUNULG1CQUFTLEtBQUssaUJBQWlCLFFBQVE7QUFDdkM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLFVBQ0UsSUFBSSxTQUNELGdCQUFpQixTQUFTLE9BQVEsVUFDbEMsZ0JBQWlCLFNBQVMsT0FBUSxRQUNyQztBQUNBLGVBQU8sV0FBVyxZQUFZLEtBQUssS0FBSztBQUFBLE1BQzFDO0FBRUEsVUFBSSxrQkFBa0IsUUFBUSxRQUFRLFNBQVM7QUFBQSxJQUNqRDtBQUFBLEVBQ0o7QUFFRSxXQUFTLGNBQWUsR0FBRztBQUN6QixTQUFLLFNBQVMsQ0FBQztBQUVmLHNCQUFrQjtBQUFBLEVBQ3BCO0FBRUEsV0FBUyxnQkFBaUIsR0FBRztBQUMzQixTQUFLLFdBQVcsQ0FBQztBQUVqQixRQUNFLGdCQUFnQixDQUFDLE1BQU0sUUFDcEIsRUFBRSxXQUFXLEtBQ2hCO0FBRUYsVUFDRSxNQUFNLFNBQVMsT0FDZixRQUFRLElBQUksZ0JBQ1osTUFBTSxJQUFJO0FBRVosUUFBSSxDQUFDLEVBQUUsVUFBVTtBQUNmLHdCQUFrQjtBQUFBLElBQ3BCO0FBRUEsUUFBSSxFQUFFLFlBQVksTUFBTSxFQUFFLFlBQVksSUFBSTtBQUN4QyxVQUFJLEVBQUUsWUFBWSxvQkFBb0IsUUFBUTtBQUM1QywwQkFBa0IsSUFBSSx1QkFBdUIsWUFBWSxRQUFRO0FBQUEsTUFDbkU7QUFFQSxZQUFNLEtBQUssWUFBYSxFQUFFLFlBQVksS0FBSyxVQUFVLFdBQVcsTUFBTSxvQkFBb0IsT0FBTyxZQUFZLEdBQUc7QUFFaEgsUUFBRSxlQUFjO0FBQ2hCLFNBQUcsS0FBSyxvQkFBb0IsUUFBUSxNQUFNLEtBQUs7QUFFL0MsVUFBSSxFQUFFLFVBQVU7QUFDZCxjQUFNLFNBQVMsSUFBSTtBQUNuQixZQUFJLGtCQUFrQixLQUFLLElBQUksaUJBQWlCLE1BQU0sR0FBRyxLQUFLLElBQUksaUJBQWlCLE1BQU0sR0FBRyxTQUFTO0FBQUEsTUFDdkc7QUFBQSxJQUNGLFdBRUUsRUFBRSxZQUFZLEtBQ1gsTUFBTSxvQkFBb0IsUUFDMUIsVUFBVSxLQUNiO0FBQ0EsaUJBQVcsS0FBSyxLQUFLLEtBQUs7QUFDMUIsVUFBSSxrQkFBa0IsSUFBSSxnQkFBZ0IsS0FBSyxVQUFVO0FBQUEsSUFDM0QsV0FFRSxFQUFFLFlBQVksTUFDWCxNQUFNLG9CQUFvQixRQUMxQixVQUFVLEtBQ2I7QUFDQSxpQkFBVyxhQUFhLEtBQUssR0FBRztBQUNoQyxVQUFJLGtCQUFrQixPQUFPLElBQUksY0FBYyxTQUFTO0FBQUEsSUFDMUQ7QUFBQSxFQUNGO0FBRUEsV0FBUyxVQUFXLEtBQUsseUJBQXlCO0FBQ2hELFFBQUksUUFBUSxVQUFVLFFBQVEsUUFBUSxRQUFRLElBQUk7QUFBRSxhQUFPO0FBQUEsSUFBRztBQUU5RCxRQUFJLE1BQU0sb0JBQW9CLE1BQU07QUFDbEMsYUFBTyxpQkFBaUIsS0FBSyx1QkFBdUI7QUFBQSxJQUN0RDtBQUVBLFVBQU0sT0FBTztBQUViLFFBQUksV0FBVyxHQUFHLFNBQVM7QUFFM0IsYUFBUyxZQUFZLEdBQUcsWUFBWSxLQUFLLFFBQVEsYUFBYTtBQUM1RCxZQUNFLFVBQVUsSUFBSyxRQUFRLEdBQ3ZCLFVBQVUsS0FBTSxTQUFTO0FBRTNCLFVBQUksT0FBTyxZQUFZLFVBQVU7QUFDL0Isa0JBQVU7QUFFVixZQUFJLDRCQUE0QixRQUFRLFlBQVksU0FBUztBQUMzRDtBQUFBLFFBQ0Y7QUFBQSxNQUNGLFdBQ1MsWUFBWSxVQUFVLFFBQVEsTUFBTSxLQUFLLE9BQU8sR0FBRztBQUMxRCxrQkFBVSxRQUFRLGNBQWMsU0FDNUIsUUFBUSxVQUFVLE9BQU8sSUFDekI7QUFDSjtBQUFBLE1BQ0YsT0FDSztBQUNILGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUVBLFdBQU87QUFBQSxFQUNUO0FBRUEsV0FBUyxpQkFBa0IsS0FBSyx5QkFBeUI7QUFDdkQsVUFDRSxPQUFPLGNBQ1Asa0JBQWtCLFdBQVcsUUFBUSxNQUFNO0FBRTdDLFFBQUksV0FBVyxJQUFJLFNBQVMsR0FBRyxTQUFTO0FBRXhDLGFBQVMsWUFBWSxLQUFLLFNBQVMsR0FBRyxhQUFhLEtBQUssYUFBYSxJQUFJLGFBQWE7QUFDcEYsWUFBTSxVQUFVLEtBQU0sU0FBUztBQUUvQixVQUFJLFVBQVUsSUFBSyxRQUFRO0FBRTNCLFVBQUksT0FBTyxZQUFZLFVBQVU7QUFDL0IsaUJBQVMsVUFBVTtBQUVuQixZQUFJLDRCQUE0QixRQUFRLFlBQVksU0FBUztBQUMzRDtBQUFBLFFBQ0Y7QUFBQSxNQUNGLFdBQ1MsWUFBWSxVQUFVLFFBQVEsTUFBTSxLQUFLLE9BQU8sR0FBRztBQUMxRCxXQUFHO0FBQ0Qsb0JBQVUsUUFBUSxjQUFjLFNBQVMsUUFBUSxVQUFVLE9BQU8sSUFBSSxXQUFXO0FBQ2pGO0FBQ0Esb0JBQVUsSUFBSyxRQUFRO0FBQUEsUUFFekIsU0FBUyxvQkFBb0IsYUFBYSxZQUFZLFVBQVUsUUFBUSxNQUFNLEtBQUssT0FBTztBQUFBLE1BQzVGLE9BQ0s7QUFDSCxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFdBQVMsWUFBYSxLQUFLO0FBQ3pCLFdBQU8sT0FBTyxRQUFRLFlBQVksbUJBQW1CLFNBQ2hELE9BQU8sUUFBUSxXQUFXLGVBQWUsS0FBSyxHQUFHLElBQUksTUFDdEQsZUFBZSxHQUFHO0FBQUEsRUFDeEI7QUFFQSxXQUFTLGFBQWMsS0FBSztBQUMxQixRQUFJLGFBQWEsU0FBUyxJQUFJLFVBQVUsR0FBRztBQUN6QyxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8sTUFBTSxvQkFBb0IsUUFBUSxJQUFJLFdBQVcsSUFDcEQsYUFBYSxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sSUFBSSxNQUNyQyxNQUFNLGFBQWEsTUFBTSxJQUFJLE1BQU07QUFBQSxFQUN6QztBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNKO0FBQ0E7QUNsbUJPLE1BQU0sZUFBZTtBQUFBLEVBQzFCLE1BQU07QUFDUjtBQVVPLFNBQVMsY0FBZSxZQUFZLElBQUk7QUFDN0MsU0FBTyxDQUFDLE9BQU8sUUFBUSxjQUFjO0FBQ25DLFVBQU8sTUFBTTtBQUFBLE1BQ1gsRUFBRSxTQUFTO0FBQUEsUUFDVCxPQUFPLFlBQVksYUFBYTtBQUFBLFFBQ2hDLEdBQUcsVUFBVTtBQUFBLE1BQ3JCLENBQU87QUFBQSxJQUNQO0FBQUEsRUFDRTtBQUNGO0FBRU8sU0FBUyxxQkFBc0IsT0FBTztBQUMzQyxTQUFPLFNBQVMsTUFBTSxNQUFNLFFBQVEsTUFBTSxHQUFHO0FBQy9DO0FDekJlLFNBQUEsb0JBQVUsT0FBTyxXQUFXO0FBQ3pDLFdBQVMsa0JBQW1CO0FBQzFCLFVBQU0sUUFBUSxNQUFNO0FBRXBCLFFBQUk7QUFDRixZQUFNLEtBQUssa0JBQWtCLFNBQ3pCLElBQUksYUFBWSxJQUNmLG9CQUFvQixTQUNqQixJQUFJLGVBQWUsRUFBRSxFQUFFLGdCQUN2QjtBQUdSLFVBQUksT0FBTyxLQUFLLE1BQU0sT0FBTztBQUMzQixTQUFDLFlBQVksUUFDVCxNQUFNLEtBQUssS0FBSyxJQUNoQixDQUFFLEtBQUssR0FDVCxRQUFRLFVBQVE7QUFDaEIsYUFBRyxNQUFNLElBQUksSUFBSTtBQUFBLFFBQ25CLENBQUM7QUFBQSxNQUNIO0FBRUEsYUFBTztBQUFBLFFBQ0wsT0FBTyxHQUFHO0FBQUEsTUFDbEI7QUFBQSxJQUNJLFNBQ08sR0FBRztBQUNSLGFBQU87QUFBQSxRQUNMLE9BQU87QUFBQSxNQUNmO0FBQUEsSUFDSTtBQUFBLEVBQ0Y7QUFFQSxTQUNJLFNBQVMsTUFBTTtBQUNmLFFBQUksTUFBTSxTQUFTLE9BQVE7QUFDM0IsV0FBTyxnQkFBZTtBQUFBLEVBQ3hCLENBQUM7QUFFTDtBQ3RDQSxNQUFNLGFBQWE7QUFDbkIsTUFBTSxZQUFZO0FBQ2xCLE1BQU0sV0FBVztBQUNqQixNQUFNLGNBQWM7QUFFTCxTQUFBLGtCQUFVLFNBQVM7QUFDaEMsU0FBTyxTQUFTLGNBQWUsR0FBRztBQUNoQyxRQUFJLEVBQUUsU0FBUyxvQkFBb0IsRUFBRSxTQUFTLFVBQVU7QUFDdEQsVUFBSSxFQUFFLE9BQU8sZUFBZSxLQUFNO0FBQ2xDLFFBQUUsT0FBTyxhQUFhO0FBQ3RCLGNBQVEsQ0FBQztBQUFBLElBQ1gsV0FFRSxFQUFFLFNBQVMsdUJBQ1IsRUFBRSxPQUFPLGVBQWUsUUFDeEIsT0FBTyxFQUFFLFNBQVMsVUFDckI7QUFDQSxZQUFNLGNBQWMsT0FBTyxHQUFHLFlBQVksT0FDdEMsWUFBWSxLQUFLLEVBQUUsSUFBSSxNQUFNLFFBQzdCLFdBQVcsS0FBSyxFQUFFLElBQUksTUFBTSxRQUFRLFVBQVUsS0FBSyxFQUFFLElBQUksTUFBTSxRQUFRLFNBQVMsS0FBSyxFQUFFLElBQUksTUFBTTtBQUVyRyxVQUFJLGdCQUFnQixNQUFNO0FBQ3hCLFVBQUUsT0FBTyxhQUFhO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FDZkEsTUFBQSxTQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLGNBQWM7QUFBQSxFQUVkLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQTtBQUFBLElBR0gsWUFFSSxDQUFFLFFBQVEsUUFBUSxRQUFTO0FBQUEsSUFFL0IsWUFBWTtBQUFBLElBRVosTUFBTTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLElBQUE7QUFBQSxJQUdYLFVBQVUsQ0FBRSxRQUFRLE1BQU87QUFBQSxJQUUzQixVQUFVO0FBQUE7QUFBQSxJQUVWLFlBQVksQ0FBRSxPQUFPLFFBQVEsTUFBTztBQUFBLElBQ3BDLFlBQVksQ0FBRSxPQUFPLFFBQVEsTUFBTztBQUFBLEVBQUE7QUFBQSxFQUd0QyxPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSDtBQUFBLElBQVM7QUFBQSxJQUNUO0FBQUEsSUFBVztBQUFBLElBQVM7QUFBQSxFQUFBO0FBQUEsRUFHdEIsTUFBTyxPQUFPLEVBQUUsTUFBTSxTQUFTO0FBQzdCLFVBQU0sRUFBRSxNQUFBLElBQVUsbUJBQUE7QUFDbEIsVUFBTSxFQUFFLE9BQU87QUFFZixVQUFNLE9BQU8sQ0FBQTtBQUNiLFFBQUksa0JBQWtCLEtBQUssYUFBYSxrQkFBa0IsWUFBWSxNQUFNO0FBRTVFLFVBQU0sV0FBVyxJQUFJLElBQUk7QUFDekIsVUFBTSxXQUFXLHFCQUFxQixLQUFLO0FBRTNDLFVBQU07QUFBQSxNQUNKO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUFBLElBQ0UsUUFBUSxPQUFPLE1BQU0sV0FBVyxRQUFRO0FBRTVDLFVBQU0sZUFBZTtBQUFBLE1BQW9CO0FBQUEsSUFBNEI7QUFDckUsVUFBTSxXQUFXLFNBQVMsTUFBTSxtQkFBbUIsV0FBVyxLQUFLLENBQUM7QUFFcEUsVUFBTSxnQkFBZ0Isa0JBQWtCLE9BQU87QUFFL0MsVUFBTSxRQUFRLGNBQWMsRUFBRSxhQUFhLE1BQU07QUFFakQsVUFBTSxhQUFhO0FBQUEsTUFBUyxNQUMxQixNQUFNLFNBQVMsY0FBYyxNQUFNLGFBQWE7QUFBQSxJQUFBO0FBR2xELFVBQU0sYUFBYTtBQUFBLE1BQVMsTUFDMUIsV0FBVyxVQUFVLFFBQ2xCLENBQUUsUUFBUSxVQUFVLE9BQU8sT0FBTyxVQUFXLEVBQUUsU0FBUyxNQUFNLElBQUk7QUFBQSxJQUFBO0FBR3ZFLFVBQU0sV0FBVyxTQUFTLE1BQU07QUFDOUIsWUFBTSxNQUFNO0FBQUEsUUFDVixHQUFHLE1BQU0sV0FBVyxVQUFVO0FBQUEsUUFDOUI7QUFBQSxRQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtBO0FBQUEsUUFDQSxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsTUFBQTtBQUdYLFVBQUkscUJBQXFCLElBQUksc0JBQXNCLElBQUksbUJBQW1CO0FBRTFFLFVBQUksUUFBUSxVQUFVLE1BQU07QUFDMUIsWUFBSSxZQUFZO0FBRWhCLFlBQUksVUFBVTtBQUFBLE1BQ2hCO0FBRUEsVUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixZQUFJLGlCQUFpQjtBQUFBLE1BQ3ZCO0FBRUEsYUFBTztBQUFBLElBQ1QsQ0FBQztBQUVELFVBQU0sYUFBYSxTQUFTLE1BQU07QUFDaEMsWUFBTUMsU0FBUTtBQUFBLFFBQ1osVUFBVTtBQUFBLFFBQ1Ysa0JBQWtCLE1BQU0sY0FBYyxRQUFRO0FBQUEsUUFDOUMsTUFBTSxNQUFNLFNBQVMsYUFBYSxJQUFJO0FBQUEsUUFDdEMsY0FBYyxNQUFNO0FBQUEsUUFDcEIsTUFBTSxTQUFTO0FBQUEsUUFDZixHQUFHLE1BQU0sV0FBVyxXQUFXO0FBQUEsUUFDL0IsSUFBSSxNQUFNLFVBQVU7QUFBQSxRQUNwQixXQUFXLE1BQU07QUFBQSxRQUNqQixVQUFVLE1BQU0sWUFBWTtBQUFBLFFBQzVCLFVBQVUsTUFBTSxhQUFhO0FBQUEsTUFBQTtBQUcvQixVQUFJLFdBQVcsVUFBVSxPQUFPO0FBQzlCQSxlQUFNLE9BQU8sTUFBTTtBQUFBLE1BQ3JCO0FBRUEsVUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQkEsZUFBTSxPQUFPO0FBQUEsTUFDZjtBQUVBLGFBQU9BO0FBQUFBLElBQ1QsQ0FBQztBQUtELFVBQU0sTUFBTSxNQUFNLE1BQU0sTUFBTTtBQUM1QixVQUFJLFNBQVMsT0FBTztBQUNsQixpQkFBUyxNQUFNLFFBQVEsTUFBTTtBQUFBLE1BQy9CO0FBQUEsSUFDRixDQUFDO0FBRUQsVUFBTSxNQUFNLE1BQU0sWUFBWSxDQUFBLE1BQUs7QUFDakMsVUFBSSxRQUFRLFVBQVUsTUFBTTtBQUMxQixZQUFJLHFCQUFxQixNQUFNO0FBQzdCLDZCQUFtQjtBQUNuQixjQUFJLE9BQU8sQ0FBQyxNQUFNLGdCQUFpQjtBQUFBLFFBQ3JDO0FBRUEsd0JBQWdCLENBQUM7QUFBQSxNQUNuQixXQUNTLFdBQVcsVUFBVSxHQUFHO0FBQy9CLG1CQUFXLFFBQVE7QUFFbkIsWUFDRSxNQUFNLFNBQVMsWUFDWixLQUFLLGVBQWUsT0FBTyxNQUFNLE1BQ3BDO0FBQ0EsY0FBSSxnQkFBZ0IsTUFBTTtBQUN4QiwwQkFBYztBQUFBLFVBQ2hCLE9BQ0s7QUFDSCxtQkFBTyxLQUFLO0FBQUEsVUFDZDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBR0EsWUFBTSxhQUFhLFFBQVEsU0FBUyxZQUFZO0FBQUEsSUFDbEQsQ0FBQztBQUVELFVBQU0sTUFBTSxNQUFNLFVBQVUsQ0FBQSxRQUFPO0FBRWpDLFVBQUksUUFBUSxNQUFNO0FBQ2hCLGlCQUFTLFlBQVk7QUFBQSxNQUN2QixXQUVTLFNBQVMsVUFBVSxRQUFRLE1BQU0sT0FBTyxHQUFHO0FBQ2xELGlCQUFTLE1BQU0sTUFBTSxTQUFTO0FBQUEsTUFDaEM7QUFBQSxJQUNGLENBQUM7QUFFRCxVQUFNLE1BQU0sTUFBTSxPQUFPLE1BQU07QUFDN0IsWUFBTSxhQUFhLFFBQVEsU0FBUyxZQUFZO0FBQUEsSUFDbEQsQ0FBQztBQUVELGFBQVMsUUFBUztBQUNoQixpQkFBVyxNQUFNO0FBQ2YsY0FBTSxLQUFLLFNBQVM7QUFDcEIsWUFDRSxTQUFTLFVBQVUsUUFDaEIsU0FBUyxVQUFVLE9BQ2xCLE9BQU8sUUFBUSxHQUFHLE9BQU8sTUFBTSxVQUFVLFFBQzdDO0FBQ0EsbUJBQVMsTUFBTSxNQUFNLEVBQUUsZUFBZSxNQUFNO0FBQUEsUUFDOUM7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBRUEsYUFBUyxTQUFVO0FBQ2pCLGVBQVMsT0FBTyxPQUFBO0FBQUEsSUFDbEI7QUFFQSxhQUFTLFFBQVMsR0FBRztBQUNuQixVQUFJLFFBQVEsVUFBVSxRQUFRLE1BQU0sb0JBQW9CLE1BQU07QUFDNUQsY0FBTSxNQUFNLEVBQUU7QUFDZCwyQkFBbUIsS0FBSyxJQUFJLGdCQUFnQixJQUFJLFlBQVk7QUFBQSxNQUM5RDtBQUVBLFdBQUssU0FBUyxDQUFDO0FBQUEsSUFDakI7QUFFQSxhQUFTLFFBQVMsR0FBRztBQUNuQixVQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBUTtBQUVyQixVQUFJLE1BQU0sU0FBUyxRQUFRO0FBQ3pCLGFBQUsscUJBQXFCLEVBQUUsT0FBTyxLQUFLO0FBQ3hDO0FBQUEsTUFDRjtBQUVBLFlBQU0sTUFBTSxFQUFFLE9BQU87QUFFckIsVUFBSSxFQUFFLE9BQU8sZUFBZSxNQUFNO0FBQ2hDLGFBQUssUUFBUTtBQUNiO0FBQUEsTUFDRjtBQUVBLFVBQUksUUFBUSxVQUFVLE1BQU07QUFDMUIsd0JBQWdCLEtBQUssT0FBTyxFQUFFLFNBQVM7QUFBQSxNQUN6QyxPQUNLO0FBQ0gsa0JBQVUsR0FBRztBQUViLFlBQUksV0FBVyxVQUFVLFFBQVEsRUFBRSxXQUFXLFNBQVMsZUFBZTtBQUNwRSxnQkFBTSxFQUFFLGdCQUFnQixhQUFBLElBQWlCLEVBQUU7QUFFM0MsY0FBSSxtQkFBbUIsVUFBVSxpQkFBaUIsUUFBUTtBQUN4RCxxQkFBUyxNQUFNO0FBQ2Isa0JBQUksRUFBRSxXQUFXLFNBQVMsaUJBQWlCLElBQUksUUFBUSxFQUFFLE9BQU8sS0FBSyxNQUFNLEdBQUc7QUFDNUUsa0JBQUUsT0FBTyxrQkFBa0IsZ0JBQWdCLFlBQVk7QUFBQSxjQUN6RDtBQUFBLFlBQ0YsQ0FBQztBQUFBLFVBQ0g7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUlBLFlBQU0sYUFBYSxRQUFRLGFBQUE7QUFBQSxJQUM3QjtBQUVBLGFBQVMsZUFBZ0IsR0FBRztBQUMxQixXQUFLLGdCQUFnQixDQUFDO0FBQ3RCLG1CQUFBO0FBQUEsSUFDRjtBQUVBLGFBQVMsVUFBVyxLQUFLLGFBQWE7QUFDcEMsb0JBQWMsTUFBTTtBQUNsQixvQkFBWTtBQUVaLFlBQ0UsTUFBTSxTQUFTLFlBQ1osS0FBSyxlQUFlLE9BQU8sTUFBTSxNQUNwQztBQUNBLGlCQUFPLEtBQUs7QUFBQSxRQUNkO0FBRUEsWUFBSSxNQUFNLGVBQWUsT0FBTyxvQkFBb0IsS0FBSztBQUN2RCw0QkFBa0I7QUFFbEIsMEJBQWdCLFNBQVMsbUJBQW1CO0FBQzVDLGVBQUsscUJBQXFCLEdBQUc7QUFFN0IsbUJBQVMsTUFBTTtBQUNiLGdDQUFvQixRQUFRLGtCQUFrQjtBQUFBLFVBQ2hELENBQUM7QUFBQSxRQUNIO0FBRUEsc0JBQWM7QUFBQSxNQUNoQjtBQUVBLFVBQUksTUFBTSxTQUFTLFVBQVU7QUFDM0Isc0JBQWM7QUFDZCxhQUFLLFFBQVE7QUFBQSxNQUNmO0FBRUEsVUFBSSxNQUFNLGFBQWEsUUFBUTtBQUM3QixzQkFBYyxRQUFRLGFBQWEsU0FBUztBQUM1QyxhQUFLLFFBQVE7QUFDYixvQkFBWSxXQUFXLGFBQWEsTUFBTSxRQUFRO0FBQUEsTUFDcEQsT0FDSztBQUNILG9CQUFBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFHQSxhQUFTLGVBQWdCO0FBQ3ZCLDRCQUFzQixNQUFNO0FBQzFCLGNBQU0sTUFBTSxTQUFTO0FBQ3JCLFlBQUksUUFBUSxNQUFNO0FBQ2hCLGdCQUFNLGNBQWMsSUFBSSxXQUFXO0FBRW5DLGdCQUFNLEVBQUUsY0FBYztBQUV0QixnQkFBTSxFQUFFLFdBQVcsY0FBYyxHQUFHLFNBQVMsR0FBRyxZQUFZLE9BQ3hELENBQUEsSUFDQSxPQUFPLGlCQUFpQixHQUFHO0FBSS9CLGdCQUFNLGlCQUFpQixjQUFjLFVBQVUsY0FBYztBQUk3RCw2QkFBbUIsU0FBUyxJQUFJLE1BQU0sWUFBWTtBQUNsRCxzQkFBWSxlQUFnQixJQUFJLGVBQWUsSUFBSztBQUNwRCxjQUFJLE1BQU0sU0FBUztBQUVuQixjQUFJLE1BQU0sU0FBUyxJQUFJLGVBQWU7QUFHdEMsNkJBQW1CLFNBQVMsSUFBSSxNQUFNLFlBQVksU0FBUyxXQUFXLEVBQUUsSUFBSSxJQUFJLGVBQWUsU0FBUztBQUN4RyxzQkFBWSxlQUFlO0FBQzNCLGNBQUksWUFBWTtBQUFBLFFBQ2xCO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUVBLGFBQVMsU0FBVSxHQUFHO0FBQ3BCLG9CQUFjLENBQUM7QUFFZixVQUFJLGNBQWMsTUFBTTtBQUN0QixxQkFBYSxTQUFTO0FBQ3RCLG9CQUFZO0FBQUEsTUFDZDtBQUVBLG9CQUFBO0FBRUEsV0FBSyxVQUFVLEVBQUUsT0FBTyxLQUFLO0FBQUEsSUFDL0I7QUFFQSxhQUFTLGdCQUFpQixHQUFHO0FBQzNCLFlBQU0sVUFBVSxLQUFLLENBQUM7QUFFdEIsVUFBSSxjQUFjLE1BQU07QUFDdEIscUJBQWEsU0FBUztBQUN0QixvQkFBWTtBQUFBLE1BQ2Q7QUFFQSxvQkFBQTtBQUVBLG9CQUFjO0FBQ2QseUJBQW1CO0FBQ25CLGFBQU8sS0FBSztBQUlaLFlBQU0sU0FBUyxVQUFVLFdBQVcsTUFBTTtBQUN4QyxZQUFJLFNBQVMsVUFBVSxNQUFNO0FBQzNCLG1CQUFTLE1BQU0sUUFBUSxXQUFXLFVBQVUsU0FBUyxXQUFXLFFBQVE7QUFBQSxRQUMxRTtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFFQSxhQUFTLGNBQWU7QUFDdEIsYUFBTyxLQUFLLGVBQWUsT0FBTyxNQUFNLE9BQ3BDLEtBQUssUUFDSixXQUFXLFVBQVUsU0FBUyxXQUFXLFFBQVE7QUFBQSxJQUN4RDtBQUVBLG9CQUFnQixNQUFNO0FBQ3BCLHNCQUFBO0FBQUEsSUFDRixDQUFDO0FBRUQsY0FBVSxNQUFNO0FBRWQsWUFBTSxhQUFhLFFBQVEsYUFBQTtBQUFBLElBQzdCLENBQUM7QUFFRCxXQUFPLE9BQU8sT0FBTztBQUFBLE1BQ25CO0FBQUEsTUFFQSxZQUFZO0FBQUEsUUFBUyxNQUNuQixLQUFNLFdBQVcsVUFBVSxPQUFPLGFBQWEsT0FBUSxNQUNwRCxNQUFNLGFBQWEsT0FBTywwQkFBMEI7QUFBQSxNQUFBO0FBQUEsTUFHekQsV0FBVztBQUFBLFFBQVMsTUFDbEIsTUFBTSxTQUFTLFVBQ1osT0FBTyxNQUFNLGVBQWUsWUFDNUIsTUFBTSxXQUFXLFdBQVc7QUFBQSxNQUFBO0FBQUEsTUFHakM7QUFBQSxNQUVBO0FBQUEsTUFFQTtBQUFBLE1BRUEsZUFBZTtBQUFBLFFBQVMsTUFFcEIsU0FBUyxVQUFVLFNBQ2YsTUFBTSxTQUFTLFlBQVksTUFBTSxXQUFXLEtBQUssTUFBTSxVQUUxRCxtQkFBbUIsTUFBTSxZQUFZO0FBQUEsTUFBQTtBQUFBLE1BRzFDLFlBQVksTUFBTTtBQUNoQixlQUFPLEVBQUUsV0FBVyxVQUFVLE9BQU8sYUFBYSxTQUFTO0FBQUEsVUFDekQsS0FBSztBQUFBLFVBQ0wsT0FBTztBQUFBLFlBQ0w7QUFBQSxZQUNBLE1BQU07QUFBQSxVQUFBO0FBQUEsVUFFUixPQUFPLE1BQU07QUFBQSxVQUNiLEdBQUcsV0FBVztBQUFBLFVBQ2QsR0FBRyxTQUFTO0FBQUEsVUFDWixHQUNFLE1BQU0sU0FBUyxTQUNYLEVBQUUsT0FBTyxZQUFBLEVBQVksSUFDckIsYUFBYTtBQUFBLFFBQUEsQ0FFcEI7QUFBQSxNQUNIO0FBQUEsTUFFQSxrQkFBa0IsTUFBTTtBQUN0QixlQUFPLEVBQUUsT0FBTztBQUFBLFVBQ2QsT0FBTyx1RUFDRixXQUFXLFVBQVUsT0FBTyxLQUFLO0FBQUEsUUFBQSxHQUNyQztBQUFBLFVBQ0QsRUFBRSxRQUFRLEVBQUUsT0FBTyxZQUFBLEdBQWUsYUFBYTtBQUFBLFVBQy9DLEVBQUUsUUFBUSxNQUFNLFVBQVU7QUFBQSxRQUFBLENBQzNCO0FBQUEsTUFDSDtBQUFBLElBQUEsQ0FDRDtBQUVELFVBQU0sV0FBVyxTQUFTLEtBQUs7QUFHL0IsV0FBTyxPQUFPLE9BQU87QUFBQSxNQUNuQjtBQUFBLE1BQ0E7QUFBQSxNQUNBLGtCQUFrQixNQUFNLFNBQVM7QUFBQTtBQUFBLElBQUEsQ0FDbEM7QUFFRCxlQUFXLE9BQU8sWUFBWSxNQUFNLFNBQVMsS0FBSztBQUVsRCxXQUFPO0FBQUEsRUFDVDtBQUNGLENBQUM7QUNsY0QsTUFBQSxZQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLFlBQVk7QUFBQSxJQUNaLFNBQVM7QUFBQSxJQUNULE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULFFBQVE7QUFBQSxJQUNSLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxFQUNaO0FBQUEsRUFFRSxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sVUFBVSxTQUFTLE1BQU07QUFDN0IsWUFBTSxNQUFNLENBQUUsY0FBYyxXQUFXLFFBQVEsV0FBVyxVQUFVLFFBQVEsV0FBVyxRQUFRLEVBQzVGLE9BQU8sT0FBSyxNQUFPLENBQUMsTUFBTyxJQUFJLEVBQy9CLElBQUksT0FBSyxnQkFBaUIsQ0FBQyxFQUFHLEVBQUUsS0FBSyxHQUFHO0FBRTNDLGFBQU8sMEJBQTJCLElBQUksV0FBVyxJQUFJLE1BQU0sTUFBTSxFQUFFLE1BQzlELE1BQU0sV0FBVyxPQUFPLHlCQUF5QjtBQUFBLElBQ3hELENBQUM7QUFFRCxXQUFPLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxRQUFRLFNBQVMsTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLEVBQ3RFO0FBQ0YsQ0FBQztBQ3JCRCxNQUFBLGFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBRUgsWUFBWTtBQUFBLE1BQ1YsVUFBVTtBQUFBLElBQ2hCO0FBQUEsSUFFSSxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixXQUFXLE9BQUssRUFBRTtBQUFBLFFBQ2hCLFVBQVEsV0FBVyxPQUFPLFVBQVUsT0FBTyxVQUFVLFFBQVEsV0FBVztBQUFBLE1BQ2hGO0FBQUEsSUFDQTtBQUFBO0FBQUE7QUFBQSxJQUlJLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxNQUNYLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNmO0FBQUEsSUFDSSxpQkFBaUI7QUFBQSxJQUVqQixTQUFTO0FBQUEsSUFDVCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixTQUFTO0FBQUEsSUFDVCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFFUixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFFVCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsSUFFVCxPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFFVCxRQUFRO0FBQUEsSUFFUixXQUFXO0FBQUEsSUFFWCxRQUFRO0FBQUEsTUFDTixNQUFNLENBQUUsU0FBUyxNQUFNO0FBQUEsTUFDdkIsU0FBUztBQUFBLElBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFFRSxPQUFPLENBQUUscUJBQXFCLFNBQVMsT0FBTztBQUFBLEVBRTlDLE1BQU8sT0FBTyxFQUFFLE9BQU8sS0FBSSxHQUFJO0FBQzdCLFVBQU0saUJBQWlCO0FBQUEsTUFBUyxNQUM5QixNQUFNLFFBQVEsS0FBSyxTQUFPLElBQUksVUFBVSxNQUFNLFVBQVUsTUFBTTtBQUFBLElBQ3BFO0FBRUksVUFBTSxZQUFZLFNBQVMsT0FBTztBQUFBLE1BQ2hDLE1BQU07QUFBQSxNQUNOLE1BQU0sTUFBTTtBQUFBLE1BQ1osT0FBTyxNQUFNO0FBQUEsSUFDbkIsRUFBTTtBQUVGLFVBQU0sa0JBQWtCLGNBQWMsU0FBUztBQUUvQyxVQUFNLGdCQUFnQixTQUFTLE1BQU0saUJBQWlCLEtBQUssQ0FBQztBQUU1RCxVQUFNLGtCQUFrQixTQUFTLE9BQU87QUFBQSxNQUN0QyxTQUFTLE1BQU07QUFBQSxNQUNmLE9BQU8sTUFBTTtBQUFBLE1BQ2IsR0FBRyxjQUFjO0FBQUEsSUFDdkIsRUFBTTtBQUVGLFVBQU0sYUFBYSxTQUFTLE1BQU0sTUFBTSxRQUFRLElBQUksQ0FBQyxNQUFNLE1BQU07QUFDL0QsWUFBTSxFQUFFLE9BQU8sT0FBTyxNQUFNLEdBQUcsSUFBRyxJQUFLO0FBRXZDLGFBQU87QUFBQSxRQUNMO0FBQUEsUUFDQSxPQUFPO0FBQUEsVUFDTCxLQUFLO0FBQUEsVUFFTCxnQkFBZ0IsVUFBVSxNQUFNLGFBQWEsU0FBUztBQUFBLFVBQ3RELEdBQUc7QUFBQSxVQUNILEdBQUc7QUFBQSxVQUNILEdBQUcsZ0JBQWdCO0FBQUEsVUFFbkIsU0FBUyxNQUFNLFlBQVksUUFBUSxJQUFJLFlBQVk7QUFBQTtBQUFBLFVBR25ELE9BQU8sVUFBVSxNQUFNLGFBQ25CLFNBQVMsS0FBSyxhQUFhLElBQzNCLFNBQVMsS0FBSyxPQUFPO0FBQUEsVUFDekIsV0FBVyxVQUFVLE1BQU0sYUFDdkIsU0FBUyxLQUFLLGlCQUFpQixJQUMvQixTQUFTLEtBQUssV0FBVztBQUFBLFVBQzdCLFFBQVEsU0FBUyxLQUFLLFFBQVEsTUFBTTtBQUFBLFVBQ3BDLFFBQVEsU0FBUyxLQUFLLFFBQVEsTUFBTTtBQUFBLFVBRXBDLE1BQU0sU0FBUyxLQUFLLE1BQU07QUFBQSxVQUMxQixTQUFTLFNBQVMsS0FBSyxTQUFTO0FBQUEsVUFDaEMsUUFBUSxTQUFTLEtBQUssUUFBUTtBQUFBLFVBQzlCLE9BQU8sU0FBUyxLQUFLLE9BQU8sTUFBTTtBQUFBLFVBQ2xDLFNBQVMsU0FBUyxLQUFLLFNBQVMsTUFBTTtBQUFBLFVBRXRDLFFBQVMsR0FBRztBQUFFLGdCQUFJLE9BQU8sTUFBTSxDQUFDO0FBQUEsVUFBRTtBQUFBLFFBQzVDO0FBQUEsTUFDQTtBQUFBLElBQ0ksQ0FBQyxDQUFDO0FBRUYsYUFBUyxJQUFLLE9BQU8sS0FBSyxHQUFHO0FBQzNCLFVBQUksTUFBTSxhQUFhLE1BQU07QUFDM0IsWUFBSSxNQUFNLGVBQWUsT0FBTztBQUM5QixjQUFJLE1BQU0sY0FBYyxNQUFNO0FBQzVCLGlCQUFLLHFCQUFxQixNQUFNLElBQUk7QUFDcEMsaUJBQUssT0FBTztBQUFBLFVBQ2Q7QUFBQSxRQUNGLE9BQ0s7QUFDSCxlQUFLLHFCQUFxQixPQUFPLEdBQUc7QUFBQSxRQUN0QztBQUVBLGFBQUssU0FBUyxDQUFDO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBRUEsYUFBUyxTQUFVLEtBQUssS0FBSztBQUMzQixhQUFPLElBQUssU0FBVSxTQUFTLE1BQU8sR0FBRyxJQUFLLElBQUssR0FBRztBQUFBLElBQ3hEO0FBRUEsYUFBUyxhQUFjO0FBQ3JCLFlBQU0sUUFBUSxXQUFXLE1BQU0sSUFBSSxTQUFPO0FBQ3hDLGVBQU8sRUFBRSxNQUFNLElBQUksT0FBTyxJQUFJLFNBQVMsU0FBUyxNQUFPLElBQUksSUFBSSxJQUFLLE1BQU07QUFBQSxNQUM1RSxDQUFDO0FBRUQsVUFBSSxNQUFNLFNBQVMsVUFBVSxNQUFNLFlBQVksUUFBUSxlQUFlLFVBQVUsTUFBTTtBQUNwRix3QkFBZ0IsT0FBTyxNQUFNO0FBQUEsTUFDL0I7QUFFQSxhQUFPLFdBQVcsTUFBTSxTQUFTLEtBQUs7QUFBQSxJQUN4QztBQUVBLFdBQU8sTUFBTSxFQUFFLFdBQVc7QUFBQSxNQUN4QixPQUFPO0FBQUEsTUFDUCxHQUFHLGNBQWM7QUFBQSxNQUNqQixTQUFTLE1BQU07QUFBQSxNQUNmLFNBQVMsTUFBTTtBQUFBLE1BQ2YsUUFBUSxNQUFNO0FBQUEsTUFDZCxRQUFRLE1BQU07QUFBQSxJQUNwQixHQUFPLFVBQVU7QUFBQSxFQUNmO0FBQ0YsQ0FBQztBQy9KRCxNQUFBLFFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsV0FBVztBQUFBLElBQ1gsY0FBYztBQUFBLElBQ2QsY0FBYztBQUFBLElBQ2QsUUFBUTtBQUFBLElBRVIsVUFBVTtBQUFBLEVBQ2Q7QUFBQSxFQUVFLE9BQU8sQ0FBRSxTQUFTLHFCQUFxQixpQkFBaUI7QUFBQSxFQUV4RCxNQUFPLE9BQU8sRUFBRSxPQUFPLEtBQUksR0FBSTtBQUM3QixVQUFNLEtBQUssbUJBQWtCO0FBQzdCLFVBQU0sVUFBVSxJQUFJLElBQUk7QUFFeEIsUUFBSSxnQkFBZ0I7QUFDcEIsVUFBTSx1QkFBdUIsQ0FBQTtBQUU3QixhQUFTLFNBQVUsYUFBYTtBQUM5QixZQUFNQyxTQUFRLE9BQU8sZ0JBQWdCLFlBQ2pDLGNBQ0EsTUFBTSxpQkFBaUI7QUFFM0IsWUFBTSxRQUFRLEVBQUU7QUFFaEIsWUFBTSxZQUFZLENBQUMsS0FBS0MsU0FBUTtBQUM5QixhQUFLLGFBQWMsUUFBUSxPQUFPLFlBQVksT0FBTyxJQUFLQSxJQUFHO0FBQUEsTUFDL0Q7QUFFQSxZQUFNLG9CQUFvQixVQUFRO0FBQ2hDLGNBQU0sUUFBUSxLQUFLLFNBQVE7QUFFM0IsZUFBTyxPQUFPLE1BQU0sU0FBUyxhQUN6QixNQUFNO0FBQUEsVUFDTixDQUFBQyxZQUFVLEVBQUUsT0FBQUEsUUFBTztVQUNuQixVQUFRLEVBQUUsT0FBTyxPQUFPLE1BQU0sSUFBRztBQUFBLFFBQzdDLElBQ1ksUUFBUSxRQUFRLEVBQUUsT0FBTyxLQUFJLENBQUU7QUFBQSxNQUNyQztBQUVBLFlBQU0sZ0JBQWdCLE1BQU0sV0FBVyxPQUNuQyxRQUNDLElBQUkscUJBQXFCLElBQUksaUJBQWlCLENBQUMsRUFDL0MsS0FBSyxTQUFPLElBQUksT0FBTyxPQUFLLEVBQUUsVUFBVSxJQUFJLENBQUMsSUFDOUMscUJBQ0M7QUFBQSxRQUNDLENBQUMsS0FBSyxTQUFTLElBQUksS0FBSyxNQUFNO0FBQzVCLGlCQUFPLGtCQUFrQixJQUFJLEVBQUUsS0FBSyxPQUFLO0FBQ3ZDLGdCQUFJLEVBQUUsVUFBVSxPQUFPO0FBQUUscUJBQU8sUUFBUSxPQUFPLENBQUM7QUFBQSxZQUFFO0FBQUEsVUFDcEQsQ0FBQztBQUFBLFFBQ0gsQ0FBQztBQUFBLFFBQ0QsUUFBUSxRQUFPO0FBQUEsTUFDM0IsRUFDVyxNQUFNLFdBQVMsQ0FBRSxLQUFLLENBQUU7QUFFN0IsYUFBTyxjQUFjLEtBQUssWUFBVTtBQUNsQyxZQUFJLFdBQVcsVUFBVSxPQUFPLFdBQVcsR0FBRztBQUM1QyxvQkFBVSxpQkFBaUIsVUFBVSxJQUFJO0FBQ3pDLGlCQUFPO0FBQUEsUUFDVDtBQUdBLFlBQUksVUFBVSxlQUFlO0FBQzNCLGdCQUFNLEVBQUUsTUFBTSxJQUFHLElBQUssT0FBUSxDQUFDO0FBRS9CLGtCQUFRLFVBQVUsUUFBUSxNQUFNLEdBQUc7QUFDbkMsb0JBQVUsT0FBTyxJQUFJO0FBRXJCLGNBQUlGLFdBQVUsTUFBTTtBQUVsQixrQkFBTSxjQUFjLE9BQU8sS0FBSyxDQUFDLEVBQUUsTUFBQUcsTUFBSSxNQUNyQyxPQUFPQSxNQUFLLFVBQVUsY0FDbkIsY0FBY0EsTUFBSyxDQUFDLE1BQU0sS0FDOUI7QUFFRCxnQkFBSSxnQkFBZ0IsUUFBUTtBQUMxQiwwQkFBWSxLQUFLLE1BQUs7QUFBQSxZQUN4QjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUEsZUFBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFFQSxhQUFTLGtCQUFtQjtBQUMxQjtBQUVBLDJCQUFxQixRQUFRLFVBQVE7QUFDbkMsZUFBTyxLQUFLLG9CQUFvQixjQUFjLEtBQUssZ0JBQWU7QUFBQSxNQUNwRSxDQUFDO0FBQUEsSUFDSDtBQUVBLGFBQVMsT0FBUSxLQUFLO0FBQ3BCLGNBQVEsVUFBVSxlQUFlLEdBQUc7QUFFcEMsWUFBTSxRQUFRLGdCQUFnQjtBQUU5QixlQUFRLEVBQUcsS0FBSyxTQUFPO0FBRXJCLFlBQUksVUFBVSxpQkFBaUIsUUFBUSxNQUFNO0FBQzNDLGNBQUksTUFBTSxhQUFhLFFBQVE7QUFDN0IsaUJBQUssVUFBVSxHQUFHO0FBQUEsVUFDcEIsV0FDUyxLQUFLLFdBQVcsVUFBVSxPQUFPLElBQUksT0FBTyxXQUFXLFlBQVk7QUFDMUUsZ0JBQUksT0FBTyxPQUFNO0FBQUEsVUFDbkI7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUVBLGFBQVMsTUFBTyxLQUFLO0FBQ25CLGNBQVEsVUFBVSxlQUFlLEdBQUc7QUFFcEMsV0FBSyxPQUFPO0FBRVosZUFBUyxNQUFNO0FBQ2Isd0JBQWU7QUFDZixZQUFJLE1BQU0sY0FBYyxRQUFRLE1BQU0saUJBQWlCLE1BQU07QUFDM0QsZ0JBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUVBLGFBQVMsUUFBUztBQUNoQixpQkFBVyxNQUFNO0FBQ2YsWUFBSSxRQUFRLFVBQVUsS0FBTTtBQUU1QixjQUFNLFNBQVMsUUFBUSxNQUFNLGNBQWMsbURBQW1ELEtBQ3pGLFFBQVEsTUFBTSxjQUFjLHFEQUFxRCxLQUNqRixRQUFRLE1BQU0sY0FBYywrQkFBK0IsS0FDM0QsTUFBTSxVQUFVLEtBQUssS0FBSyxRQUFRLE1BQU0saUJBQWlCLFlBQVksR0FBRyxRQUFNLEdBQUcsYUFBYSxFQUFFO0FBRXJHLGdCQUFRLE1BQU0sRUFBRSxlQUFlLEtBQUksQ0FBRTtBQUFBLE1BQ3ZDLENBQUM7QUFBQSxJQUNIO0FBRUEsWUFBUSxTQUFTO0FBQUEsTUFDZixjQUFlLFNBQVM7QUFDdEIsNkJBQXFCLEtBQUssT0FBTztBQUFBLE1BQ25DO0FBQUEsTUFFQSxnQkFBaUIsU0FBUztBQUN4QixjQUFNLFFBQVEscUJBQXFCLFFBQVEsT0FBTztBQUNsRCxZQUFJLFVBQVUsSUFBSTtBQUNoQiwrQkFBcUIsT0FBTyxPQUFPLENBQUM7QUFBQSxRQUN0QztBQUFBLE1BQ0Y7QUFBQSxJQUNOLENBQUs7QUFFRCxRQUFJLGlCQUFpQjtBQUVyQixrQkFBYyxNQUFNO0FBQ2xCLHVCQUFpQjtBQUFBLElBQ25CLENBQUM7QUFFRCxnQkFBWSxNQUFNO0FBQ2hCLHlCQUFtQixRQUFRLE1BQU0sY0FBYyxRQUFRLE1BQUs7QUFBQSxJQUM5RCxDQUFDO0FBRUQsY0FBVSxNQUFNO0FBQ2QsWUFBTSxjQUFjLFFBQVEsTUFBSztBQUFBLElBQ25DLENBQUM7QUFHRCxXQUFPLE9BQU8sR0FBRyxPQUFPO0FBQUEsTUFDdEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSx5QkFBeUIsTUFBTTtBQUFBLElBQ3JDLENBQUs7QUFFRCxXQUFPLE1BQU0sRUFBRSxRQUFRO0FBQUEsTUFDckIsT0FBTztBQUFBLE1BQ1AsS0FBSztBQUFBLE1BQ0wsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLElBQ2YsR0FBTyxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDekI7QUFDRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5SUQsVUFBTSxRQUFRO0FBZWQsY0FBVSxNQUFNO0FBQ1oseUJBQWtCO0FBQ2xCLDRCQUFxQjtBQUFBLElBQ3pCLENBQUM7QUFFRCxVQUFNLGVBQWUsSUFBSSxFQUFFO0FBQzNCLFVBQU0sa0JBQWtCLElBQUksRUFBRTtBQUU5QixVQUFNLFVBQVUsSUFBSSxJQUFJO0FBRXhCLFVBQU0sbUJBQW1CLFlBQVk7QUFDakMsYUFBTyxNQUFNLFFBQVEsTUFBTSxTQUFRO0FBQUEsSUFDdkM7QUFDQSxVQUFNLHFCQUFxQixNQUFNO0FBQzdCLFlBQU0sT0FBTyxRQUFRLE9BQUs7QUFDdEIsY0FBTSxVQUFVO0FBQUEsVUFDWixPQUFPLEVBQUU7QUFBQSxVQUNULE9BQU8sRUFBRTtBQUFBLFVBQ1QsTUFBTSxtQkFBbUIsRUFBRSxFQUFFLEVBQUU7QUFBQSxRQUMzQztBQUNRLHFCQUFhLE1BQU0sS0FBSyxPQUFPO0FBQUEsTUFDbkMsQ0FBQztBQUFBLElBQ0w7QUFFQSxVQUFNLHdCQUF3QixNQUFNO0FBQ2hDLFlBQU0sV0FBVyxRQUFRLE9BQUs7QUFDMUIsY0FBTSxVQUFVO0FBQUEsVUFDWixPQUFPLEVBQUU7QUFBQSxVQUNULE9BQU8sRUFBRSxLQUFLLE1BQU8sRUFBRTtBQUFBLFFBQ25DO0FBQ1Esd0JBQWdCLE1BQU0sS0FBSyxPQUFPO0FBQUEsTUFDdEMsQ0FBQztBQUFBLElBQ0w7QUFFQSxVQUFNLGFBQWEsTUFBTTtBQUNyQixZQUFNLFNBQVMsVUFBVSxvQkFBSSxLQUFJO0FBQUEsSUFDckM7QUFHQSxhQUFhO0FBQUEsTUFDVDtBQUFBLElBQ0osQ0FBQzs7Ozs7Ozs7OztBQXpHWSxNQUFBLGFBQUEsRUFBQSxPQUFNLE1BQUs7QUFZWCxNQUFBLGFBQUEsRUFBQSxPQUFNLE1BQUs7QUFTWCxNQUFBLGFBQUEsRUFBQSxPQUFNLE1BQUs7QUFRWCxNQUFBLGFBQUEsRUFBQSxPQUFNLHNCQUFxQjtBQUV2QixNQUFBLGFBQUEsRUFBQSxPQUFNLFNBQVE7QUFFbEIsTUFBQSxhQUFBLEVBQUEsT0FBTSw4QkFBNkI7QUFFL0IsTUFBQSxhQUFBLEVBQUEsT0FBTSxTQUFROztzQkFwQzNCQyxZQXNDUyxPQUFBO0FBQUEsSUF0Q0QsS0FBSTtBQUFBLElBQVUsT0FBTTtBQUFBO3FCQUN4QixNQVdNO0FBQUEsTUFYTkMsZ0JBV00sT0FYTixZQVdNO0FBQUEsUUFWRkMsWUFTMEMsUUFBQTtBQUFBLFVBVHhCLFlBQUEsT0FBQSxTQUFTO0FBQUEsVUFBVCx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxZQUFBLE9BQUEsU0FBUyxPQUFJO0FBQUEsVUFDdEIsS0FBSTtBQUFBLFVBQ0osY0FBQTtBQUFBLFVBQ0MsUUFBUSxTQUFPLE9BQU8sSUFBSSxTQUFNLEtBQUEsdUJBQUE7QUFBQSxVQUNqQyxVQUFBO0FBQUEsVUFDQSxXQUFBO0FBQUEsVUFBVSxVQUFBO0FBQUEsVUFDVixXQUFVO0FBQUEsVUFDVixPQUFNO0FBQUEsVUFDTixPQUFNO0FBQUEsVUFDTixNQUFLO0FBQUE7O01BRWxCRCxnQkFRTSxPQVJOLFlBUU07QUFBQSxRQVBGLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBQSxnQkFBeUMsUUFBQSxFQUFuQyxPQUFNLGlCQUFnQixHQUFDLFNBQUssRUFBQTtBQUFBLFFBQ2xDQyxZQUtlLFlBQUE7QUFBQSxVQUxRLFlBQUEsT0FBQSxTQUFTO0FBQUEsVUFBVCx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxZQUFBLE9BQUEsU0FBUyxRQUFLO0FBQUEsVUFDdkIsZ0JBQWE7QUFBQSxVQUNiLE9BQU07QUFBQSxVQUNOLFdBQUE7QUFBQSxVQUFRLFFBQUE7QUFBQSxVQUNQLFNBQVMsT0FBQTtBQUFBLFVBQWUsU0FBTyxPQUFBO0FBQUE7O01BR2xERCxnQkFPTSxPQVBOLFlBT007QUFBQSxRQU5GLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBQSxnQkFBNEMsUUFBQSxFQUF0QyxPQUFNLGlCQUFnQixHQUFDLFlBQVEsRUFBQTtBQUFBLFFBQ3JDQyxZQUk4RCxZQUFBO0FBQUEsVUFKdkMsWUFBQSxPQUFBLFNBQVM7QUFBQSxVQUFULHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLFlBQUEsT0FBQSxTQUFTLFdBQVE7QUFBQSxVQUMxQixnQkFBYTtBQUFBLFVBQ2IsT0FBTTtBQUFBLFVBQ04sV0FBQTtBQUFBLFVBQVEsUUFBQTtBQUFBLFVBQ1AsU0FBUyxPQUFBO0FBQUEsVUFBa0IsU0FBTyxPQUFBO0FBQUE7O01BRXJERCxnQkFHTSxPQUhOLFlBR007QUFBQSxRQUZGLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBQSxnQkFBb0QsT0FBQSxFQUEvQyxPQUFNLHdCQUF1QixHQUFDLGVBQVcsRUFBQTtBQUFBLFFBQzlDQSxnQkFBNEQsT0FBNUQsWUFBNERFLGdCQUFyQyxrQkFBVyxPQUFBLFNBQVMsT0FBTyxDQUFBLEdBQUEsQ0FBQTtBQUFBO01BRXRERixnQkFHTSxPQUhOLFlBR007QUFBQSxRQUZGLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBQSxnQkFBb0QsT0FBQSxFQUEvQyxPQUFNLHdCQUF1QixHQUFDLGVBQVcsRUFBQTtBQUFBLFFBQzlDQSxnQkFBNEQsT0FBNUQsWUFBNERFLGdCQUFyQyxrQkFBVyxPQUFBLFNBQVMsT0FBTyxDQUFBLEdBQUEsQ0FBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0o5RCxVQUFNLFFBQVE7Ozs7Ozs7c0JBaENWSCxZQXVCVyxTQUFBLEVBQUEsTUFBQSxpQkF2Qkk7QUFBQSxxQkFDWCxNQWdCVztBQUFBLE1BaEJYRSxZQWdCVyxTQUFBLEVBQUEsVUFBQSxHQWhCRCxHQUFBO0FBQUEseUJBQ04sTUFjWTtBQUFBLFVBZFpBLFlBY1ksVUFBQSxFQUFBLE9BQUEsYUFkSyxHQUFBO0FBQUEsNkJBQ2IsTUFHWTtBQUFBLGNBSFpBLFlBR1ksTUFBQTtBQUFBLGdCQUZSLE1BQUE7QUFBQSxnQkFBSyxPQUFBO0FBQUEsZ0JBQU0sT0FBQTtBQUFBLGdCQUNYLE1BQUs7QUFBQSxnQkFDTCxJQUFHO0FBQUE7Y0FDUEEsWUFFa0IsZUFBQSxNQUFBO0FBQUEsaUNBRGQsTUFBVztBQUFBLGtEQUFSLE9BQUEsS0FBSyxHQUFBLENBQUE7QUFBQTs7O2NBR0YsT0FBQSxRQUFRLFFBQVEsT0FBQSxRQUFRLHlCQURsQ0YsWUFLOEIsTUFBQTtBQUFBO2dCQUgxQixNQUFBO0FBQUEsZ0JBQUssT0FBQTtBQUFBLGdCQUFNLE9BQUE7QUFBQSxnQkFDVixNQUFNLE9BQUEsT0FBTztBQUFBLGdCQUNiLFNBQVMsT0FBQSxPQUFPO0FBQUEsZ0JBQ2hCLFNBQU8sT0FBQSxPQUFPO0FBQUE7Ozs7Ozs7TUFHM0JFLFlBSW1CLGdCQUFBLE1BQUE7QUFBQSx5QkFIZixNQUVTO0FBQUEsVUFGVEEsWUFFUyxPQUFBLEVBQUEsT0FBQSxVQUZELEdBQU07QUFBQSw2QkFDVixNQUFPO0FBQUEsY0FBUEUsV0FBTyxLQUFBLFFBQUEsU0FBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN5QnZCLFVBQU0sUUFBUTtBQU9kLFVBQU0sVUFBVSxVQUFTO0FBQ3pCLFVBQU0sa0JBQWtCLElBQUksSUFBSTtBQUNoQyxVQUFNO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0osSUFBSSxZQUFZLE1BQU0sRUFBRTtBQUN4QixVQUFNLGlCQUFpQixJQUFJLEtBQUs7QUFHaEMsVUFBTSxZQUFZLFNBQVMsTUFBTSxPQUFPLFNBQVMsYUFBYSxLQUFLO0FBQ25FLFVBQU0sY0FBYyxTQUFTLE1BQU0sVUFBVSxTQUFTLENBQUMsYUFBYSxLQUFLO0FBQ3pFLFVBQU0sY0FBYyxTQUFTLE1BQU0sT0FBTyxTQUFTLENBQUMsYUFBYSxLQUFLO0FBS3RFLFVBQU0sWUFBWSxNQUFNO0FBQ3BCLGNBQVEsS0FBSyxFQUFDLE1BQU0sUUFBTyxDQUFDO0FBQUEsSUFDaEM7QUFLQSxVQUFNLGVBQWUsWUFBWTtBQUM3QixZQUFNLFFBQVEsTUFBTSxnQkFBZ0IsTUFBTSxpQkFBZ0I7QUFDMUQsVUFBSSxPQUFPO0FBQ1AsY0FBTSxLQUFJO0FBQ1YsZUFBTyxDQUFDLENBQUMsYUFBYSxPQUFPLFlBQVksT0FBTyxhQUFhLEtBQUs7QUFDbEUsWUFBSSxDQUFDLGFBQWEsT0FBTztBQUNyQixvQkFBUztBQUFBLFFBQ2I7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUtBLFVBQU0saUJBQWlCLFlBQVk7QUFDL0IsWUFBTSxPQUFNO0FBQ1osYUFBTyxDQUFDLENBQUMsYUFBYSxPQUFPLFlBQVksU0FBUyxhQUFhLEtBQUs7QUFDcEUsVUFBSSxDQUFDLGFBQWEsT0FBTztBQUNyQixrQkFBUztBQUFBLE1BQ2I7QUFBQSxJQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF2R0lGLFlBaUJtQixPQUFBLGlCQUFBLEdBQUE7QUFBQSxNQWpCQSxPQUFPLE9BQUEsUUFBSyxrQkFBQSxnQkFBcUMsT0FBQTtBQUFBLE1BQ2pELFFBQU0sRUFBQSxNQUFBLFFBQUEsVUFBNEIsT0FBQSxjQUFZLFNBQVcsT0FBQSxlQUFlLE9BQUEsYUFBWTtBQUFBO3VCQUVuRyxNQUUwRDtBQUFBLFFBRjVDLE9BQUEsMEJBQWRGLFlBRTBELE9BQUEsUUFBQSxHQUFBO0FBQUE7VUFEakQsU0FBUyxPQUFBO0FBQUEsVUFBZSxjQUFZO0FBQUEsVUFBYyxhQUFXO0FBQUEsVUFDN0QsZ0JBQWM7QUFBQSxVQUFXLG1CQUFpQixPQUFBO0FBQUE7UUFFbkRFLFlBQXlELGVBQUE7QUFBQSxVQUF2QyxTQUFTLE9BQUE7QUFBQSxVQUFhLE9BQU07QUFBQTtRQUV4QixPQUFBLDRCQUF0QkYsWUFDaUYsT0FBQSxjQUFBLEdBQUE7QUFBQTtVQUQ5QyxLQUFJO0FBQUEsVUFDdEIsYUFBVyxPQUFBO0FBQUEsVUFBVyxRQUFRLE9BQUE7QUFBQSxVQUFTLFlBQVksT0FBQTtBQUFBO1FBR3BFRSxZQUdnQixhQUFBO0FBQUEsVUFIRCxVQUFTO0FBQUEsVUFBZ0IsUUFBUSxDQUFBLElBQUEsRUFBQTtBQUFBOzJCQUM1QyxNQUN3RDtBQUFBLFlBRHhEQSxZQUN3RCxNQUFBO0FBQUEsY0FEakQsS0FBQTtBQUFBLGNBQUksTUFBSztBQUFBLGNBQVUsU0FBUyxPQUFBLFNBQVMsT0FBQSxlQUFlLE9BQUE7QUFBQSxjQUNwRCxPQUFNO0FBQUEsY0FBWSwrQ0FBTyxPQUFBLGlCQUFjO0FBQUE7Ozs7Ozs7SUFJdERBLFlBS1csU0FBQTtBQUFBLGtCQUxRLE9BQUE7QUFBQSxtRUFBQSxPQUFBLGlCQUFjO0FBQUE7dUJBRzdCLE1BQzhFO0FBQUEsUUFEOUVBLFlBQzhFLE9BQUEsZUFBQSxHQUFBO0FBQUEsVUFEN0QsTUFBTTtBQUFBLFVBQVcsdUJBQXFCLE9BQUE7QUFBQSxVQUN0QyxTQUFTLE9BQUEsaUJBQWlCLGlCQUFpQixPQUFBLFVBQVUsSUFBSTtBQUFBOzs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswLDIsMyw0LDUsNiw3LDgsOSwxMCwxMSwxMiwxMywxNCwxNSwxNl19
