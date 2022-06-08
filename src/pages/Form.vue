<template>
  <div>
    <div class="container">
      <form @submit.prevent="sendSMS" action="sendsms.php">
        <h1 style="color:#333">Send an sms</h1>
        <p>Type a number and message</p>
        <template v-if="alert">
          <div v-if="alert.status"></div>
          <div v-else class="alert alert-danger">{{alert.message}}</div>
        </template>
        <div class="form-group">
          <input
            aria-label="label"
            type="text"
            v-model="sms.phone"
            class="form-control"
            placeholder="phone number"
          />
        </div>

        <div class="form-group">
          <input
            aria-label="label"
            type="text"
            v-model="sms.message"
            class="form-control"
            placeholder="message"
          />
        </div>

        <CodeInput
          :loading="false"
          class="input"
          v-on:change="onChange"
          v-on:complete="onComplete"
        />

        <div class="form-group">
          <button type="submit" class="btn btn-success btn-lg btn-block">Send SMS</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import CodeInput from "vue-verification-code-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { apiDomain } from "../config";
export default {
  components: {
    CodeInput
  },
  data() {
    return {
      sms: {
        phone: null,
        formattedPhone: null,
        message: null
      },
      alert: null,
      sending: false
    };
  },
  methods: {
    onChange(v) {
      console.log("onChange ", v);
    },
    onComplete(v) {
      console.log("onComplete ", v);
    },
    sendSMS() {
      const phoneNumber = parsePhoneNumberFromString(this.sms.phone, "TN");
      if (!phoneNumber.isValid()) {
        this.sendError(false, "Phone Number is not valid");
        return;
      }
      console.log(phoneNumber);
      this.sms.formattedPhone = phoneNumber.number;
      this.sending = true;

      const options = {
        method: "POST",
        headers: { "content-type": "application/form-data" },
        data: this.sms,
        url: "https://etnafes.com/api/sendsms.php"
      };
      const data = axios(options);
      console.log(data);
    },
    sendError(status, message) {
      this.alert = {
        status: status,
        message: message
      };
    }
  }
};
</script>