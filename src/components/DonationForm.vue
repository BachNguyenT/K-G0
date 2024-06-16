<template>
  <div v-if="showPopup" class="popup success">
    Successfully Submitted & Saved to Local Storage
  </div>
  <div v-if="showInvalidPopup" class="popup failed">
    Failed to Submitted & Saved to Local Storage, Please Fill All Required Forms
  </div>
  <div class="form">
    <div class="form_container">
      <div class="form_wrapper">
        <label for="FirstName" class="form-label">FIRST NAME</label>
        <input
          type="text"
          class="form-control"
          id="FirstName"
          name="FirstName"
          v-model="fname"
          required
          @input="handleInputChange"
        />
        <p class="warning" v-if="errors.FirstName">{{ errors.FirstName }}</p>
      </div>
      <div class="form_wrapper">
        <label for="Gender" class="form-label">GENDER</label>
        <select
          class="form-select"
          name="Gender"
          v-model="gender"
          required
          @input="handleInputChange"
        >
          <option selected></option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <p class="warning" v-if="errors.Gender">{{ errors.Gender }}</p>
      </div>
      <div class="form_wrapper">
        <label for="LastName" class="form-label">LAST NAME</label>
        <input
          type="text"
          class="form-control"
          id="LastName"
          name="LastName"
          v-model="lname"
          required
          @input="handleInputChange"
        />
        <p class="warning" v-if="errors.LastName">{{ errors.LastName }}</p>
      </div>
      <div>
        <label class="form-label">PAYMENT MODE</label>
        <div class="form-check-wrapper">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="Visa"
              value="Visa"
              name="PaymentMethod"
              v-model="paymentMethod"
            />
            <label class="form-check-label" for="Visa">Visa</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="PaymentMethod"
              id="Mastercard"
              value="Mastercard"
              v-model="paymentMethod"
            />
            <label class="form-check-label" for="Mastercard">Mastercard</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="PaymentMethod"
              id="Amex"
              value="Amex"
              v-model="paymentMethod"
            />
            <label class="form-check-label" for="Amex">Amex</label>
          </div>
        </div>
      </div>
      <div class="form_wrapper">
        <label for="Company" class="form-label">COMPANY</label>
        <input
          type="text"
          class="form-control"
          id="Company"
          name="Company"
          v-model="company"
          required
          @input="handleInputChange"
        />
        <p class="warning" v-if="errors.Company">{{ errors.Company }}</p>
      </div>
      <div class="form_wrapper">
        <label for="CardNo" class="form-label">CARD NUMBER</label>
        <input
          type="number"
          class="form-control"
          id="CardNo"
          name="CardNo"
          v-model="cardno"
          required
          @input="handleInputChange"
        />
        <p class="warning" v-if="errors.CardNo">{{ errors.CardNo }}</p>
      </div>
      <div class="form_wrapper">
        <label for="Email" class="form-label">EMAIL</label>
        <input
          type="email"
          class="form-control"
          id="Email"
          name="Email"
          v-model="email"
          required
          @input="handleInputChange"
        />
        <p class="warning" v-if="errors.Email">{{ errors.Email }}</p>
      </div>
      <div class="form_wrapper">
        <label for="Expiration" class="form-label">EXPIRATION</label>
        <input
          type="month"
          class="form-control"
          id="Expiration"
          name="Expiration"
          v-model="expiration"
          required
          @input="handleInputChange"
        />
        <p class="warning" v-if="errors.Expiration">{{ errors.Expiration }}</p>
      </div>
      <div class="form_wrapper">
        <label for="Phone" class="form-label">PHONE NUMBER</label>
        <input
          type="number"
          class="form-control"
          id="Phone"
          name="Phone"
          v-model="phone"
          required
          @input="handleInputChange"
        />
        <p class="warning" v-if="errors.Phone">{{ errors.Phone }}</p>
      </div>

      <div class="form_wrapper">
        <label for="CVN" class="form-label">CVN</label>
        <input
          type="text"
          class="form-control"
          id="CVN"
          name="CVN"
          v-model="cvn"
          required
          @input="handleInputChange"
        />
        <p class="warning" v-if="errors.CVN">{{ errors.CVN }}</p>
      </div>
    </div>
    <div class="range">
      <label for="DonateUs" class="form-label">DONATE US</label>
      <input
        type="range"
        class="form-range"
        min="0"
        max="1000"
        id="DonateUs"
        v-model="donation"
        ref="inputSlider"
      />
      <div class="sliderValue" ref="sliderValue">
        <span>&lt; ${{ donation }} &gt;</span>
      </div>
    </div>

    <div class="button">
      <button type="submit" class="btn btn-primary" @click="handleSubmit">
        SUBMIT
      </button>
      <button type="button" class="btn btn-custom" @click="handleReset">
        RESET
      </button>
    </div>
  </div>
</template>

<script>
import { isEmpty, isEmail, isNumber, isMonth } from "../validator";

export default {
  name: "DonationForm",
  data: () => ({
    fname: "",
    lname: "",
    company: "",
    email: "",
    phone: "",
    gender: "",
    paymentMethod: "Visa",
    cardno: "",
    expiration: "",
    cvn: "",
    donation: 500,

    errors: {
      FirstName: false,
      LastName: false,
      Company: false,
      Email: false,
      Phone: false,
      Gender: false,
      CardNo: false,
      Expiration: false,
      CVN: false,
    },
    showPopup: false,
    showInvalidPopup: false,
  }),
  watch: {
    immediate: true,
    deep: true,
    handler() {
      this.isFormValid = this.noErrors && this.allFieldsFilled;
    },
    donation() {
      this.updateThumbPosition();
    },
  },
  computed: {
    noErrors() {
      return Object.entries(this.errors).filter(Boolean).length === 0;
    },
    allFieldsFilled() {
      return Object.values(this.values).every((value) => value.trim() !== "");
    },
  },
  methods: {
    handleSubmit() {
      const isFormValid = this.noErrors && this.allFieldsFilled;
      if (isFormValid) {
        const formData = {
          fname: this.fname,
          lname: this.lname,
          company: this.company,
          email: this.email,
          phone: this.phone,
          gender: this.gender,
          paymentMethod: this.paymentMethod,
          cardno: this.cardno,
          expiration: this.expiration,
          cvn: this.cvn,
          donation: this.donation,
        };
        localStorage.setItem("donationFormData", JSON.stringify(formData));
        console.log("Data saved to local storage:", formData);

        this.showPopup = true;

        setTimeout(() => {
          this.showPopup = false;
        }, 5000);
      } else {
        this.showInvalidPopup = true;
        setTimeout(() => {
          this.showInvalidPopup = false;
        }, 5000);
      }
    },
    handleReset() {
      this.fname = "";
      this.lname = "";
      this.company = "";
      this.email = "";
      this.phone = "";
      this.gender = "";
      this.paymentMethod = "Visa";
      this.cardno = "";
      this.expiration = "";
      this.cvn = "";
      this.donation = 500;
      localStorage.removeItem("donationFormData");
      console.log("Form data reset and cleared from local storage.");
    },
    handleInputChange(event) {
      const { name, value } = event.target;
      if (name == "Gender") {
        this.gender = value;
      }
      this.validate(name, value);
      console.log(name, value, this.expiration);
    },
    validate(name, value) {
      switch (name) {
        case "FirstName":
          if (isEmpty(value)) {
            this.errors[name] = "First name is required";
          } else {
            this.errors[name] = "";
          }
          break;
        case "LastName":
          if (isEmpty(value)) {
            this.errors[name] = "Last name is required";
          } else {
            this.errors[name] = "";
          }
          break;
        case "Company":
          if (isEmpty(value)) {
            this.errors[name] = "Company is required";
          } else {
            this.errors[name] = "";
          }
          break;
        case "Email":
          if (isEmpty(value)) {
            this.errors[name] = "Email is required";
          } else if (!isEmail(value)) {
            this.errors[name] = "Email is not valid";
          } else {
            this.errors[name] = "";
          }
          break;
        case "Phone":
          if (isEmpty(value)) {
            this.errors[name] = "Phone is required";
          } else if (!isNumber(value)) {
            this.errors[name] = "Phone is not valid";
          } else {
            this.errors[name] = "";
          }
          break;
        case "CardNo":
          if (isEmpty(value)) {
            this.errors[name] = "Card Number is required";
          } else if (!isNumber(value)) {
            this.errors[name] = "Card Number is not valid";
          } else {
            this.errors[name] = "";
          }
          break;
        case "Expiration":
          if (isEmpty(value)) {
            this.errors[name] = "Expiration is required";
          } else if (!isMonth(value)) {
            this.errors[name] = "Expiration is not valid";
          } else {
            this.errors[name] = "";
          }
          break;
        case "Gender":
          if (isEmpty(value)) {
            this.errors[name] = "Gender is required";
          } else {
            this.errors[name] = "";
          }
          break;
        case "CVN":
          if (isEmpty(value)) {
            this.errors[name] = "CVN is required";
          } else if (!isNumber(value)) {
            this.errors[name] = "CVN is not valid";
          } else {
            this.errors[name] = "";
          }
          break;
        default:
          break;
      }
    },
    updateThumbPosition() {
      const sliderValue = this.$refs.sliderValue;
      const percentage = (this.donation)/10;
      sliderValue.style.left = `calc(${percentage}% - ${0.8 * percentage}px)`;
    },
  },
  mounted() {
    this.updateThumbPosition();
  },
};
</script>

<style scoped>
.form {
  background-color: white;
  padding: 4rem;
  overflow: scroll;
}
.form_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 4rem;
  row-gap: 1rem;
}
.form-label {
  text-align: left;
  font-family: Poppins;
  font-weight: 700;
}

.form-label:after {
  content: "*";
  color: red;
  font-size: 13px;
  vertical-align: super;
}

.form-check-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 4rem;
  margin-top: 0.7rem;
  padding-right: 3rem;
}

.form-check {
  display: flex;
  align-items: center;
  column-gap: 0.7rem;
  font-weight: 600;
}

.form-check-input {
  width: 1.5rem;
  height: 1.5rem;
  background-color: #fff;
  border-color: #dadada;
}

.form-check-input:checked {
  width: 1.5rem;
  height: 1.5rem;
  background-color: #329e5e;
  border-color: #329e5e;
}

.form-check-label {
  display: inline-block;
  position: relative;
  transform: translateY(0.2rem);
}

.button {
  margin-top: 2.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  column-gap: 2rem;
}

.form-control {
  height: 51px;
}

.form-select {
  height: 51px;
}

.range {
  margin-top: 1rem;
}

#DonateUs::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 80px;
  height: 30px;
  transform: translateY(-20%);
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  background-color: #329e5e;
}

.btn {
  font-weight: 700;
  width: 8rem;
  height: 3rem;
}

.btn.btn-primary {
  background-color: #329e5e;
}

.btn.btn-custom {
  border: 0.1px solid black;
}

.popup {
  position: absolute;
  width: 18rem;
  height: 4.5rem;
  border-radius: 6px;
  margin-top: 3rem;
  margin-left: 30%;
  opacity: 90%;
  text-align: center;
  font-size: 16px;
  color: black;
  z-index: 999;
}

.success {
  background-color: #329e5e;
  padding: 0.8rem 3rem;
}

.failed {
  background-color: red;
  padding: 0.8rem 1rem;
}

.warning {
  color: red;
  position: absolute;
}

.range .sliderValue {
  position: relative;
  background-color: transparent;
  height: 30px;
  width: 80px;
  top: -44px;
  line-height: 55px;
  align-content: center;
  text-align: center;
  word-spacing: 10px;
  pointer-events: none;
  color: #fff;
}
</style>
