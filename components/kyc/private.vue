<template>
  <div>
    <el-form :model="privateForm" :rules="privateFormRules" ref="privateForm" class="kyc_form">
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <p class="block-title">Please, choose your current country</p>
          <el-form-item prop="currentCountry">
            <el-select v-model="privateForm.currentCountry" clearable filterable placeholder="Current country">
              <el-option
                v-for="item in countries"
                :key="item.name"
                :label="item.name"
                :value="item.alpha2Code">
                              <span class="flex-between flex-middle">{{item.name}} <img :src="item.flag" alt=""
                                                                                        class="country-flags"></span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <p class="block-title">Name, date of birth</p>
          <el-form-item prop="firstName">
            <el-input v-model="privateForm.firstName" placeholder="First name"></el-input>
          </el-form-item>
          <el-form-item prop="middleName">
            <el-input v-model="privateForm.middleName" placeholder="Middle name (if exist)"></el-input>
          </el-form-item>
          <el-form-item prop="lastName">
            <el-input v-model="privateForm.lastName" placeholder="Last name"></el-input>
          </el-form-item>
          <el-form-item prop="birthDate">
            <div class="form_date">
              <el-date-picker
                v-model="privateForm.birthDate"
                type="date"
                placeholder="Date of birth"
                class="form_date-picker">
              </el-date-picker>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="kyc-divider"></div>
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <p class="block-title">Nationality, residence</p>
          <el-form-item prop="nationality">
            <el-select v-model="privateForm.nationality" clearable filterable placeholder="Nationality">
              <el-option
                v-for="item in countries"
                :key="item.name"
                :label="item.name"
                :value="item.callingCodes[0]">
                              <span class="flex-between flex-middle">{{item.name}} <img :src="item.flag" alt=""
                                                                                        class="country-flags"></span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="residenceCountry">
            <el-select v-model="privateForm.residenceCountry" clearable filterable placeholder="Country of residence">
              <el-option
                v-for="item in countries"
                :key="item.name"
                :label="item.name"
                :value="item.callingCodes[0]">
                              <span class="flex-between flex-middle">{{item.name}} <img :src="item.flag" alt=""
                                                                                        class="country-flags"></span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="kyc-divider"></div>
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <p class="block-title">ID/Passport</p>
          <el-form-item prop="passportNumber">
            <el-input v-model="privateForm.passportNumber" placeholder="ID/Passport number"></el-input>
          </el-form-item>
          <el-form-item prop="issueDate">
            <div class="form_date">
              <el-date-picker
                v-model="privateForm.issueDate"
                type="date"
                placeholder="Date of issue"
                class="form_date-picker">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item prop="issuePlace">
            <el-input v-model="privateForm.issuePlace" placeholder="Place of issue"></el-input>
          </el-form-item>
          <el-form-item prop="validUntil">
            <div class="form_date">
              <el-date-picker
                v-model="privateForm.validUntil"
                type="date"
                placeholder="Valid until"
                class="form_date-picker">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item prop="isIndefinitely">
            <el-checkbox v-model="privateForm.isIndefinitely" class="flex-middle">
              <p class="kyc-checkbox">Check this box if your ID/passport is valid indefinitely</p>
            </el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <p class="photo-upload-title block-title">Upload a photo of your ID/passport <img src="/img/icons/attach.svg"
                                                                                            alt="">
          </p>
          <el-form-item prop="filePassport">
            <el-upload
              action="https://api.enecuum.com/v1/kyc-files"
              drag
              :limit="4"
              name="files[]"
              list-type="picture"
              :with-credentials="true"
              :headers="{
              'X-Requested-With': 'XMLHttpRequest'
              }"
              ref="filePassport"
              :on-preview="handlePictureCardPreview"
              :before-upload="handleBeforeUpload"
              :on-success="photoPassportUpload"
              :thumbnail-mode="true"
              class="photo-upload">
              <div class="photo-upload-text">
                Drop file here
              </div>
            </el-upload>
          </el-form-item>
          <p class="photo-upload-title block-title">Upload a selfie holding your ID/passport <img
            src="/img/icons/attach.svg" alt=""></p>
          <el-form-item prop="fileSelfiePassport">
            <el-upload
              action="https://api.enecuum.com/v1/kyc-files"
              drag
              :limit="4"
              name="files[]"
              list-type="picture"
              :with-credentials="true"
              :headers="{
              'X-Requested-With': 'XMLHttpRequest'
              }"
              ref="fileSelfiePassport"
              :on-preview="handlePictureCardPreview"
              :before-upload="handleBeforeUpload"
              :on-success="selfiePassportUpload"
              :thumbnail-mode="true"
              class="photo-upload">
              <div class="photo-upload-text">
                Drop file here
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="kyc-divider"></div>
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <p class="block-title">Address</p>
          <el-form-item prop="country">
            <el-select v-model="privateForm.country" clearable filterable placeholder="Country">
              <el-option
                v-for="item in countries"
                :key="item.name"
                :label="item.name"
                :value="item.callingCodes[0]">
                              <span class="flex-between flex-middle">{{item.name}} <img :src="item.flag" alt=""
                                                                                        class="country-flags"></span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="city">
            <el-input v-model="privateForm.city" placeholder="City"></el-input>
          </el-form-item>
          <el-form-item prop="street">
            <el-input v-model="privateForm.street" placeholder="Street"></el-input>
          </el-form-item>
          <el-form-item prop="building">
            <el-input v-model="privateForm.building" placeholder="Building"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item prop="apartment">
                <el-input v-model="privateForm.apartment" placeholder="Apartment"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item prop="zipCode">
                <el-input v-model="privateForm.zipCode" placeholder="ZIP-code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item prop="countryCode">
                <el-select v-model="privateForm.countryCode" clearable filterable placeholder="Country code">
                  <el-option
                    v-for="item in countries"
                    :key="item.name"
                    :label="item.callingCodes[0]"
                    :value="item.callingCodes[0]">
                  <span class="flex-middle flex-between">+{{ item.callingCodes[0]}} {{ item.name }} <img
                    :src="item.flag" alt="" class="country-flags"> </span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item prop="phoneNumber">
                <el-input type="tel" v-model="privateForm.phoneNumber" placeholder="(000)0000000"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <p class="photo-upload-title block-title">Upload a document confirming your address <img
            src="/img/icons/attach.svg" alt=""></p>
          <el-form-item prop="fileConfirmAddr">
            <el-upload
              action="https://api.enecuum.com/v1/kyc-files"
              drag
              :limit="4"
              name="files[]"
              list-type="picture"
              :with-credentials="true"
              :headers="{
              'X-Requested-With': 'XMLHttpRequest'
              }"
              :on-preview="handlePictureCardPreview"
              :before-upload="handleBeforeUpload"
              :on-success="confirmDocUpload"
              :thumbnail-mode="true"
              class="photo-upload">
              <div class="photo-upload-text">
                Drop file here
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="kyc-divider"></div>
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <p class="block-title">Ethereum wallet number</p>
          <el-form-item prop="ethWalletNumber">
            <el-input v-model="privateForm.ethWalletNumber" placeholder="Your wallet number"></el-input>
          </el-form-item>
          <el-form-item prop="estimatedInvest" label="Estimated investment (ether)">
            <el-input v-model="privateForm.estimatedInvest" placeholder="Estimated investment (ethereum)"
                      class="full-width"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="kyc-divider"></div>
      <el-row class="flex-center kyc_agreement">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <el-form-item prop="firstAgree">
            <el-checkbox v-model="privateForm.firstAgree" class="flex-middle">
              <p class="kyc-checkbox">I agree to the processing and storage of my personal data by Enecuum HK
                Limited.</p>
            </el-checkbox>
          </el-form-item>
          <el-form-item prop="secondAgree">
            <el-checkbox v-model="privateForm.secondAgree" class="flex-middle">
              <p class="kyc-checkbox">I hereby declare that the information provided is true and correct. I also
                understand that any willful dishonesty may render for refusal of this application.</p>
            </el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="flex-center">
      <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
        <el-button type="primary" class="neon" @click="submitForm" :loading="loading">Next</el-button>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogPhotoPreview" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import validators from './validators';

  export default {
    name: "private",
    props: {
      countries: Array
    },
    data() {
      const validateEthWallet = validators.eth;
      const validateFAgree = validators.chkbox;
      const validateSAgree = validators.chkbox;
      const validatePhoneNumber = validators.phoneNumber;
      const validateNumber = validators.numbers;
      return {
        loading: false,
        dialogVisible: false,
        dialogPhotoPreview: '',
        privateForm: {
          accountType: '1',
          currentCountry: '',
          firstName: '',
          middleName: '',
          lastName: '',
          birthDate: '',
          nationality: '',
          residenceCountry: '',
          passportNumber: '',
          issueDate: '',
          issuePlace: '',
          validUntil: '',
          isIndefinitely: false,
          filePassport: [],
          fileSelfiePassport: [],
          country: '',
          city: '',
          street: '',
          building: '',
          apartment: '',
          zipCode: '',
          countryCode: '',
          phoneNumber: '',
          fileConfirmAddr: [],
          ethWalletNumber: '',
          estimatedInvest: '',
          firstAgree: null,
          secondAgree: null,
        },
        privateFormRules: {
          firstName: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          lastName: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          birthDate: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          nationality: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          residenceCountry: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          passportNumber: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          issueDate: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          issuePlace: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          validUntil: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          filePassport: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          fileSelfiePassport: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          country: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          city: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          street: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          zipCode: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          countryCode: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          phoneNumber: [
            {
              validator: validatePhoneNumber,
              trigger: 'change'
            }
          ],
          fileConfirmAddr: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          ethWalletNumber: [
            {
              validator: validateEthWallet,
              trigger: 'change'
            }
          ],
          estimatedInvest: [
            {validator: validateNumber, trigger: 'change'}
          ],
          firstAgree: [
            {
              validator: validateFAgree,
              trigger: 'change'
            }
          ],
          secondAgree: [
            {
              validator: validateSAgree,
              trigger: 'change'
            }
          ]
        }
      }
    },
    methods: {
      handleBeforeUpload(file) {
        let filetype = file.name.split('.')[file.name.split('.').length - 1].toLocaleLowerCase();
        const acceptedList = ['jpeg', 'jpg', 'png', 'txt', 'doc', 'docx', 'xls', 'xlsx', 'gif', 'pdf'];
        const accepted = acceptedList.indexOf(filetype) > -1;
        const isLt2M = file.size / 1024 / 1024 < 15;
        if (!accepted) {
          this.$message.error('Unsuported filetype');
        }
        if (!isLt2M) {
          this.$message.error('File can not exceed 15MB');
        }
        return accepted && isLt2M;
      },
      photoPassportUpload(response, file, fileList) {
        this.privateForm.filePassport = fileList.map(item => {
          return item.response.success.filename;
        });
      },
      selfiePassportUpload(response, file, fileList) {
        this.privateForm.fileSelfiePassport = fileList.map(item => {
          return item.response.success.filename;
        });
      },
      confirmDocUpload(response, file, fileList) {
        this.privateForm.fileConfirmAddr = fileList.map(item => {
          return item.response.success.filename;
        });
      },
      handlePictureCardPreview(file) {
        this.dialogPhotoPreview = file.url;
        this.dialogVisible = true;
      },
      submitForm() {
        this.$refs['privateForm'].validate((valid) => {
          if (valid) {
            this.sendKyc();
          } else {
            this.$notify({
              title: 'Warning',
              type: 'warning',
              message: 'Please check all fields',
              position: 'bottom-left'
            });
            return false;
          }
        });
      },
      sendKyc() {
        let data = this.privateForm;
        if (this.cq_user) {
          data.cq_user = this.cq_user;
        }
        this.loading = true;
        let isSended = this.$store.dispatch('submitKyc', data);
        isSended.then(res => {
          this.loading = false;
          console.log(this.$refs);
          if (res.ok) {
            this.$refs['privateForm'].resetFields();
            this.a({category: 'lk', eventAction: 'success', eventLabel: 'kyc'});
            _paq.push(['addEcommerceItem',
              2,
              'ind',
              "kyc",
              this.privateForm.estimatedInvest,
              1
            ]);
            _paq.push(['trackEcommerceOrder',
              new Date().getTime() + '',
              this.privateForm.estimatedInvest,
            ]);
            this.$store.state.debug ? console.log('after submit kyc', res) : null;
            this.$store.commit('SET_KYC_STATE', {status: res.ok, message: res.success, code: res.code});
          } else {
            this.$notify({
              title: 'Error',
              message: res.error,
              type: 'error',
              position: 'bottom-left'
            });
          }
        });
      }
    }
  }
</script>
