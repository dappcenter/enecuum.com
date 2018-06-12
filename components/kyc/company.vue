<template>
  <div>
    <el-form :model="companyForm" :rules="companyFormRules" ref="companyForm" class="kyc_form">
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <p class="block-title">Please, choose your current country</p>
          <el-form-item prop="currentCountry">
            <el-select v-model="companyForm.currentCountry" clearable filterable placeholder="Current country">
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
          <p class="block-title">General data</p>
          <el-form-item prop="companyName">
            <el-input v-model="companyForm.companyName" placeholder="Company name"></el-input>
          </el-form-item>
          <el-form-item prop="regNumber">
            <el-input v-model="companyForm.regNumber" placeholder="Registration number"></el-input>
          </el-form-item>
          <el-form-item prop="regDate">
            <div class="form_date">
              <el-date-picker
                v-model="companyForm.regDate"
                type="date"
                placeholder="Date of incorporation"
                class="form_date-picker">
              </el-date-picker>
              <!--<el-button type="text" class="form_date-btn"><i class="fa fa-calendar" aria-hidden="true"></i></el-button>-->
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="kyc-divider"></div>
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <p class="block-title">Registration address</p>
          <el-form-item prop="regCountry">
            <el-select v-model="companyForm.regCountry" clearable filterable placeholder="Country">
              <el-option
                v-for="item in countries"
                :key="item.name"
                :label="item.name"
                :value="item.numericCode">
                                              <span class="flex-between flex-middle">{{item.name}} <img :src="item.flag"
                                                                                                        alt=""
                                                                                                        class="country-flags"></span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="regCity">
            <el-input v-model="companyForm.regCity" placeholder="City"></el-input>
          </el-form-item>
          <el-form-item prop="regStreet">
            <el-input v-model="companyForm.regStreet" placeholder="Street"></el-input>
          </el-form-item>
          <el-form-item prop="regBuilding">
            <el-input v-model="companyForm.regBuilding" placeholder="Building"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item prop="regOffice">
                <el-input v-model="companyForm.regOffice" placeholder="Office"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item prop="regZipCode">
                <el-input v-model="companyForm.regZipCode" placeholder="ZIP-code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <p class="photo-upload-title block-title">Upload a document confirming your registration <img
            src="/img/icons/attach.svg" alt=""></p>
          <el-form-item prop="fileConfirmReg">
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
              ref="fileConfirmReg"
              :on-preview="handlePictureCardPreview"
              :before-upload="handleBeforeUpload"
              :on-success="photoRegUpload"
              :thumbnail-mode="true"
              class="photo-upload">
              <div class="photo-upload-text">
                Drop file here
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <p class="block-title">Physical business address</p>
          <el-form-item prop="country">
            <el-select v-model="companyForm.country" clearable filterable placeholder="Country">
              <el-option
                v-for="item in countries"
                :key="item.name"
                :label="item.name"
                :value="item.numericCode">
                                              <span class="flex-between flex-middle">{{item.name}} <img :src="item.flag"
                                                                                                        alt=""
                                                                                                        class="country-flags"></span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="city">
            <el-input v-model="companyForm.city" placeholder="City"></el-input>
          </el-form-item>
          <el-form-item prop="street">
            <el-input v-model="companyForm.street" placeholder="Street"></el-input>
          </el-form-item>
          <el-form-item prop="building">
            <el-input v-model="companyForm.building" placeholder="Building"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item prop="office">
                <el-input v-model="companyForm.office" placeholder="Office"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item prop="zipCode">
                <el-input v-model="companyForm.zipCode" placeholder="ZIP-code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item prop="countryCode">
                <el-select v-model="companyForm.countryCode" clearable filterable placeholder="Country code">
                  <el-option
                    v-for="item in countries"
                    :key="item.name"
                    :label="item.name"
                    :value="item.numericCode">
                                                  <span class="flex-between flex-middle">+{{ item.callingCodes[0]}} {{item.name}} <img
                                                    :src="item.flag" alt=""
                                                    class="country-flags"></span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item prop="phoneNumber">
                <el-input type="tel" v-model="companyForm.phoneNumber" placeholder="(000)0000000"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div class="kyc-divider"></div>
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <p class="block-title">Authorized representative</p>
          <el-form-item prop="authFirstName">
            <el-input v-model="companyForm.authFirstName" placeholder="First name"></el-input>
          </el-form-item>
          <el-form-item prop="authMiddleName">
            <el-input v-model="companyForm.authMiddleName" placeholder="Middle name (if exist)"></el-input>
          </el-form-item>
          <el-form-item prop="authLastName">
            <el-input v-model="companyForm.authLastName" placeholder="Last name"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item prop="authCountryCode">
                <el-select v-model="companyForm.authCountryCode" clearable filterable placeholder="Country code">
                  <el-option
                    v-for="item in countries"
                    :key="item.name"
                    :label="item.callingCodes[0]"
                    :value="item.numericCode">
                                                  <span class="flex-between flex-middle">+{{ item.callingCodes[0]}} {{item.name}} <img
                                                    :src="item.flag" alt=""
                                                    class="country-flags"></span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item prop="authPhoneNumber">
                <el-input v-model="companyForm.authPhoneNumber" placeholder="(000) 000 00 00"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <p class="photo-upload-title block-title">Upload a document confirming the authority of your representative
            <img src="/img/icons/attach.svg" alt=""></p>
          <el-form-item prop="fileAuthRepr">
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
              ref="fileAuthRepr"
              :on-preview="handlePictureCardPreview"
              :before-upload="handleBeforeUpload"
              :on-success="photoAuthUpload"
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
          <p class="block-title">Ultimate Beneficiaries</p>
          <div v-for="(user, key) in companyForm.benefitsArray" :key="key">
            <el-form-item prop="firstName">
              <el-input v-model="user.firstName" placeholder="First name"></el-input>
            </el-form-item>
            <el-form-item prop="middleName">
              <el-input v-model="user.middleName" placeholder="Middle name (if exist)"></el-input>
            </el-form-item>
            <el-form-item prop="lastName">
              <el-input v-model="user.lastName" placeholder="Last name"></el-input>
            </el-form-item>
          </div>
          <el-row class="flex-center kyc-addBenefic-wrapper">
            <button class="kyc-addBenefic" @click.prevent="addBenef"><img src="/img/icons/shape_close.svg" alt="">
            </button>
            <button class="kyc-addBenefic remove" @click.prevent="removeBenef" v-if="companyForm.benefitsArray.length>1"><i
              class="fa fa-times"
              aria-hidden="true"></i>
            </button>
          </el-row>
        </el-col>
      </el-row>
      <div class="kyc-divider"></div>
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <p class="block-title">Ethereum wallet number</p>
          <el-form-item prop="ethWalletNumber">
            <el-input v-model="companyForm.ethWalletNumber" placeholder="Your wallet number"></el-input>
          </el-form-item>
          <el-form-item prop="estimatedInvest" label="Estimated investment (ether)">
            <el-input v-model="companyForm.estimatedInvest" placeholder="Estimated investment (ethereum)"
                      class="full-width"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="kyc-divider"></div>
      <el-row class="flex-center kyc_agreement">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <el-form-item prop="firstAgree">
            <el-checkbox v-model="companyForm.firstAgree" class="flex-middle" required="required">
              <p class="kyc-checkbox">I agree to the processing and storage of my personal data by Enecuum HK
                Limited.</p>
            </el-checkbox>
          </el-form-item>
          <el-form-item prop="secondAgree">
            <el-checkbox v-model="companyForm.secondAgree" class="flex-middle">
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
    name: "company",
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
        companyForm: {
          accountType: '2',
          currentCountry: '',
          companyName: '',
          regNumber: '',
          regDate: '',
          regCountry: '',
          regCity: '',
          regStreet: '',
          regBuilding: '',
          regOffice: '',
          regZipCode: '',
          fileConfirmReg: '',
          country: '',
          city: '',
          street: '',
          building: '',
          office: '',
          zipCode: '',
          countryCode: '',
          phoneNumber: '',
          authFirstName: '',
          authMiddleName: '',
          authLastName: '',
          authCountryCode: '',
          authPhoneNumber: '',
          fileAuthRepr: '',
          benefitsArray: [],
          ethWalletNumber: '',
          estimatedInvest: '',
          firstAgree: null,
          secondAgree: null,
        },
        companyFormRules: {
          companyName: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          regNumber: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          regDate: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          regCountry: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          regCity: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          regStreet: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          regOffice: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          regZipCode: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          fileConfirmReg: [
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
          office: [
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
          authFirstName: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          authLastName: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          authCountryCode: [
            {
              required: true,
              message: 'This field is required'
            }
          ],
          authPhoneNumber: [
            {
              validator: validatePhoneNumber,
              trigger: 'change'
            }
          ],
          fileAuthRepr: [
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
      addBenef() {
        this.companyForm.benefitsArray.push({
          firstName: '',
          middleName: '',
          lastName: ''
        });
      },
      removeBenef() {
        this.companyForm.benefitsArray.pop();
      },
      photoRegUpload(response, file, fileList) {
        this.companyForm.fileConfirmReg = fileList.map(item => {
          return item.response.success.filename;
        });
      },
      photoAuthUpload(response, file, fileList) {
        this.companyForm.fileAuthRepr = fileList.map(item => {
          return item.response.success.filename;
        });
      },
      handlePictureCardPreview(file) {
        this.dialogPhotoPreview = file.url;
        this.dialogVisible = true;
      },
      submitForm() {
        this.$refs['companyForm'].validate((valid) => {
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
        let data = this.companyForm;
        data.benefic = JSON.stringify(data.benefitsArray);
        if (this.cq_user) {
          data.cq_user = this.cq_user;
        }
        this.loading = true;
        let isSended = this.$store.dispatch('submitKyc', data);
        isSended.then(res => {
          this.loading = false;
          if (res.ok) {
            this.$refs['companyForm'].resetFields();
            this.a({category: 'lk', eventAction: 'success', eventLabel: 'kyc'});
            _paq.push(['addEcommerceItem',
              2,
              'comp',
              "kyc",
              this.companyForm.estimatedInvest,
              1
            ]);
            _paq.push(['trackEcommerceOrder',
              new Date().getTime() + '',
              this.companyForm.estimatedInvest,
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
