<template>
  <div class="vue-input-spinner">
    <button
      :class="buttonLeftClass || buttonClass"
      @click="decreaseValue()"
      :disabled="dataValue == minValue"
    >{{ buttonLeftText }}</button>
    <input
      v-if="editable"
      type="number"
      :value="dataValue"
      :min="minValue"
      :max="maxValue"
      :class="inputClass"
      @input="inputValue"
      :readonly="readOnly"
    />
    <label :class="inputClass" v-else>{{dataValue}}</label>
    <button
      :class="buttonRightClass || buttonClass"
      @click="increaseValue()"
      :disabled="dataValue == maxValue"
    >{{ buttonRightText }}</button>
  </div>
</template>

<script>
export default {
  name: "VueInputSpinner",
  props: {
    value: {
      type: Number,
      default() {
        return 0;
      }
    },
    minValue: {
      type: Number,
      default() {
        return 0;
      }
    },
    maxValue: {
      type: Number,
      default() {
        return 10 ** 1000;
      }
    },
    step: {
      type: Number,
      default() {
        return 1;
      }
    },
    buttonClass: {
      type: [String, Array],
      default() {
        return "vis-default-button";
      }
    },
    buttonLeftClass: {
      type: [String, Array],
      default() {
        return "";
      }
    },
    buttonRightClass: {
      type: [String, Array],
      default() {
        return "";
      }
    },
    inputClass: {
      type: [String, Array],
      default() {
        return "vis-default-input";
      }
    },
    buttonLeftText: {
      type: String,
      default() {
        return "-";
      }
    },
    buttonRightText: {
      type: String,
      default() {
        return "+";
      }
    },
    editable: {
      type: Boolean,
      default() {
        return true;
      }
    },
    readOnly: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      dataValue: this.value // For avoid mutating a prop directly
    };
  },
  watch: {
    dataValue(newValue, oldValue) {
      this.$emit("input", newValue, oldValue);
    }
  },
  methods: {
    inputValue(event) {
      if (event.target.value) this.dataValue = parseFloat(event.target.value);
    },
    decreaseValue() {
      if (this.dataValue - this.step >= this.minValue) {
        this.dataValue -= this.step;
      } else {
        this.dataValue = this.minValue;
      }
    },
    increaseValue() {
      if (this.dataValue + this.step <= this.maxValue) {
        this.dataValue += this.step;
      } else {
        this.dataValue = this.maxValue;
      }
    }
  }
};
</script>

<style scoped>
.vue-input-spinner input::-webkit-outer-spin-button,
.vue-input-spinner input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.vis-default-input {
  width: 50px;
  height: 44px;
  text-align: center;
  font-size: 24px;
}
.vis-default-button {
  width: 50px;
  height: 50px;
}
.vue-input-spinner {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
}
.vue-input-spinner label {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
