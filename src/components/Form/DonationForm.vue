<template>
  <div v-if="showPopup" class="popup success">
    Successfully Submitted & Saved to Local Storage
  </div>
  <form class="form needs-validation" novalidate>
    <div class="form_container">
      <div class="form_wrapper">
        <label for="FirstName" class="form-label">FIRST NAME</label>
        <input
          type="text"
          class="form-control"
          id="FirstName"
          name="FirstName"
          v-model="values.fname"
          required
        />
        <div class="invalid-feedback">Please provide a valid First Name</div>
      </div>
      <div class="form_wrapper">
        <label for="Gender" class="form-label">GENDER</label>
        <select
          class="form-select"
          name="Gender"
          v-model="values.gender"
          required
        >
          <option selected></option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <div class="invalid-feedback">Please select a valid Gender</div>
      </div>
      <div class="form_wrapper">
        <label for="LastName" class="form-label">LAST NAME</label>
        <input
          type="text"
          class="form-control"
          id="LastName"
          name="LastName"
          v-model="values.lname"
          required
        />
        <div class="invalid-feedback">Please provide a valid Last Name</div>
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
              v-model="values.paymentMethod"
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
              v-model="values.paymentMethod"
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
              v-model="values.paymentMethod"
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
          v-model="values.company"
          required
        />
        <div class="invalid-feedback">Please provide a valid Company</div>
      </div>
      <div class="form_wrapper">
        <label for="CardNo" class="form-label">CARD NUMBER</label>
        <input
          type="text"
          class="form-control"
          id="CardNo"
          name="CardNo"
          v-model="values.cardno"
          required
          maxlength="10"
          pattern="\d*"
        />
        <div class="invalid-feedback">Please provide a valid Card Number</div>
      </div>
      <div class="form_wrapper">
        <label for="Email" class="form-label">EMAIL</label>
        <input
          type="email"
          class="form-control"
          id="Email"
          name="Email"
          v-model="values.email"
          required
        />
        <div class="invalid-feedback">Please provide a valid Email</div>
      </div>
      <div class="form_wrapper">
        <label for="Expiration" class="form-label">EXPIRATION</label>
        <input
          type="month"
          class="form-control"
          id="Expiration"
          name="Expiration"
          v-model="values.expiration"
          required
          pattern="^\d{4}-\d{2}$"
        />
        <div class="invalid-feedback">Please provide a valid Expiration</div>
      </div>
      <div class="form_wrapper">
        <label for="Phone" class="form-label">PHONE NUMBER</label>
        <input
          type="text"
          class="form-control"
          id="Phone"
          name="Phone"
          v-model="values.phone"
          required
          maxlength="10"
          pattern="\d*"
        />
        <div class="invalid-feedback">Please provide a valid Phone</div>
      </div>

      <div class="form_wrapper">
        <label for="CVN" class="form-label">CVN</label>
        <input
          type="text"
          class="form-control"
          id="CVN"
          name="CVN"
          v-model="values.cvn"
          required
          maxlength="10"
        />
        <div class="invalid-feedback">Please provide a valid CVN</div>
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
        <span>&lt;${{ donation }}&gt;</span>
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
  </form>
</template>

<script>
export default {
  name: "DonationForm",
  data: () => ({
    values: {
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
    },
    donation: 500,
    showPopup: false,
  }),
  watch: {
    immediate: true,
    deep: true,
    donation() {
      this.updateThumbPosition();
    },
  },
  methods: {
    handleSubmit() {
      "use strict";
      var forms = document.querySelectorAll(".needs-validation");
      Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener(
          "submit",
          (event) => {
            console.log(event);
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              const formData = {
                ...this.values,
                donation: this.donation,
              };
              localStorage.setItem(
                "donationFormData",
                JSON.stringify(formData)
              );
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    handleReset() {
      this.values.fname = "";
      this.values.lname = "";
      this.values.company = "";
      this.values.email = "";
      this.values.phone = "";
      this.values.gender = "";
      this.values.paymentMethod = "Visa";
      this.values.cardno = "";
      this.values.expiration = "";
      this.values.cvn = "";
      this.donation = 500;

      localStorage.removeItem("donationFormData");
      console.log("Form data reset and cleared from local storage.");
    },

    updateThumbPosition() {
      const sliderValue = this.$refs.sliderValue;
      const percentage = this.donation / 10;
      sliderValue.style.left = `calc(${percentage}% - ${0.8 * percentage}px)`;
    },
  },
  mounted() {
    this.updateThumbPosition();
  },
};
</script>

<style scoped src="./DonationForm.css"></style>
