<template>
<div class="container">
    <div class="header">
        <div>New Event</div>
    </div>
    <div class="about">
        <h2>About</h2>
        <hr>
        
            <table>
                <tr>
                    <td>
                        <label :class="{ 'text-control' : titleError }">TITLE<span class="character-limit">*</span></label>
                    </td>
                    <td>
                        <input type="text" :class="{ 'inputs-control' : titleError }" :title="title"  v-model="title" placeholder="Make it short and clear">
                    </td>
                    
                    <td>
                        <div class="error" v-show="titleError">Title cannot be empty</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label :class="{ 'text-control' : descriptionError }">DESCRIPTION<span class="character-limit">*</span></label>
                    </td>
                    <td>
                        <textarea class="multiline" :class="{ 'inputs-control' : descriptionError }"  v-model="description" placeholder="Write about your event, be creative" cols="20" rows="10"></textarea>
                        <span class="desc">Max length 140 characters</span>
                        <span class="counter" :class="{ 'character-limit' : !checkRemaining }">{{ charactersLeft }}</span>
                    </td>
                    <td>
                        <div class="error" v-show="descriptionError">Description cannot be empty</div>
                    </td>
                </tr>
                <tr>
                    <td> 
                        <label>CATEGORY</label>
                    </td>
                    <td>
                        <select name="" id="" v-model="selectedCategory">
                            <option :value="index" v-for="(item, index) in category" :key="index">{{ item.name }} </option>
                        </select>
                        <span class="desc">Describe topic and people who should interested in this event</span>
                    </td>
                </tr>
                <tr>
                    <td> 
                        <label :class="{ 'text-control' : feeError }">PAYMENT</label>
                    </td>
                    <td>
                        <div>
                            <input id="radio-1" class="radio-custom" value="free"  v-model="paymentPicked" name="radio-group" type="radio" checked>
                            <label for="radio-1"  class="radio-custom-label" id="radio-custom2">Free event</label>
                            <input id="radio-2" class="radio-custom" value="paid" v-model="paymentPicked" name="radio-group" type="radio">
                            <label for="radio-2"  class="radio-custom-label" id="radio-custom2">Paid event</label>
                            <span v-show="fee"><input :class="{ 'inputs-control' : feeError }" type="text" v-model="feeCost"  placeholder="Fee" class="number">&nbsp;&nbsp;$</span>
                        </div>
                        
                        
                    <td>
                        <div class="error" v-show="feeError">Fee cannot be empty</div>
                    </td>
                </tr>
                <tr>
                    <td> 
                        <label>REWARD</label>
                    </td>
                    <td>
                        <input type="text" v-model="reward" placeholder="Number" class="number">
                        &nbsp;&nbsp;<span class="rewardMessage">reward points for attendance</span>
                    </td>
                </tr>
            </table>
    </div>
    <div class="coordinator">
        <h2>Coordinator</h2>
        <hr>
            <table>
                <tbody><tr>
                    <td> 
                        <label :class="{ 'text-control' : responsibleError }">RESPONSIBLE<span class="character-limit">*</span></label>
                    </td>
                    <td>
                        <select name="" v-model="selectedUser" :class="{ 'inputs-control' : responsibleError }">
                            <optgroup label="Responsible List">
                                <option :selected="selectedUser" v-for="(item, index) in responsible" :key="index" :value="index"> <span v-if="userId == item.id">Me - </span> {{ item.name }} {{ item.lastname }}</option>
                            </optgroup>
                        </select>
                    </td>
                    <td>
                        <div class="error" v-show="responsibleError">Responsible cannot be empty</div>
                    </td>
                </tr>
                <tr>
                    <td> 
                        <label>EMAIL</label>
                    </td>
                    <td>
                        <input type="email" v-model="email" placeholder="Email">
                    </td>
                    <td>
                        <div class="error" v-show="emailError">Invalid Email</div>
                    </td>
                </tr>                            
            </tbody></table>
        
    </div>
    <div class="when">
        <h2>When</h2>
        <hr>
            <table>
                <tbody><tr>
                    <td> 
                        <label :class="{ 'text-control' : dateError || dateInvalidError || hourError || hourInvalidError || minuteError || minuteInvalidError }">STARTS ON<span class="character-limit">*</span></label>
                    </td>
                    <td>
                        <input type="date" v-model="date" :class="{ 'inputs-control' : dateInvalidError || dateError }">
                        &nbsp;
                        at
                        &nbsp;
                        <input type="text" :class="{ 'inputs-control' : hourError || hourInvalidError }" placeholder="--" v-model="hour" class="time">
                        :
                        <input type="text" :class="{ 'inputs-control' : minuteError || minuteInvalidError    }" placeholder="--" v-model="minute" class="time">
                        &nbsp;
                            <input id="radio-3" class="radio-custom" value="am"  v-model="meridian" name="meridian-group" type="radio" checked>
                            <label for="radio-3"  class="radio-custom-label" id="radio-custom2">AM</label>
                            <input id="radio-4" class="radio-custom" value="pm" v-model="meridian" name="meridian-group" type="radio">
                            <label for="radio-4"  class="radio-custom-label" id="radio-custom2">PM</label>
                    </td>
                    <td>
                        <div class="error" v-show="dateError">Date cannot be empty</div>
                        <div class="error" v-show="dateInvalidError">Invalid Date</div>

                        <div class="error" v-show="hourError">Hour cannot be empty</div>
                        <div class="error" v-show="hourInvalidError">Invalid Hour</div>

                        <div class="error" v-show="minuteError">Minute cannot be empty</div>
                        <div class="error" v-show="minuteInvalidError">Invalid Minute</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>DURATION</label>
                    </td>
                    <td>
                        <input type="text" placeholder="Number" v-model="duration" class="duration" id="duration">
                        &nbsp;&nbsp;
                        hour
                    </td>
                </tr>
            </tbody>
            </table>
    </div>
    <div class="button">
        <form @submit.prevent="publishEvent()">            
            <input type="submit" value="PUBLISH EVENT">
        </form>
    </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'About',
    data() {
        return {
            userId: 3,
            title: '',
            description: '',
            category: [],
            paymentFee: 0,
            email: '',
            reward: '',
            duration: '',
            responsible: [],
            paymentPicked: true,
            selectedUser: 3,
            selectedCategory: 1,
            selectedResponsible: 3,
            date: '',
            hour: '',
            minute: '',
            newHour: '',
            newMinute: '',
            meridian: '',
            fee: false,
            feeCost: '',
            titleError: false,
            descriptionError: false,
            responsibleError: false,
            dateError: false,
            dateInvalidError: false,
            hourError: false,
            hourInvalidError: false,
            minuteError: false,
            minuteInvalidError: false,
            feeError: false,
            emailError: false
        }
    },
    methods: {
        publishEvent() {
            this.checkInputs()
            this.checkDate()
            this.checkTime()
            this.checkResponsible()
            this.checkMeridian()
            this.feeCheck()
            this.validEmail()

            if(this.titleError || this.descriptionError || this.feeError || this.responsibleError || this.dateError || this.dateInvalidError
            || this.hourError || this.hourInvalidError || this.minuteError || this.minuteInvalidError || this.emailError){
                return
            }else {
                this.$router.push('/success')
            }

            console.log(
                `User Id ` + this.userId + `\n`
                + `Event Title : ` + this.title + `\n`
                + `Event Description : ` + this.description + `\n`
                + `Event Category ID : ` + this.selectedCategory + `\n`
                + `Event Payment : ` + this.feeCost + `\n`
                + `Event Responsible ID : ` + this.selectedUser + `\n`
                + `Event Email : ` + this.email + `\n`
                + `Event Date & Time : ` + this.date + ` ` + this.hour + ':' + this.minute + ' ' + this.meridian + `\n`
                + `Event Duration : ` + this.duration
            ) 
        },
        checkMeridian() {
            if(this.meridian == 'am') {
                this.meridian = 'AM'
                this.newHour -= 12
            }else {
                this.meridian = 'PM'
                
            }
        },
        feeCheck() {
            this.feeCost !== '' ? this.feeError = false : this.feeError = true
            if(this.paymentPicked == 'free') {
                this.feeError = false
                this.feeCost = 0
            }
        },
        checkInputs() {
            this.title.length > 0 ? this.titleError = false : this.titleError = true
            this.description.length > 0 ? this.descriptionError = false : this.descriptionError = true
            this.responsible === '1' ? this.responsibleError = false : this.responsibleError = true
        },

        checkDate() {
            var currentDate = new Date()
            var currentYear = currentDate.getFullYear()
            var currentMonth = currentDate.getMonth() + 1
            var currentDay = currentDate.getDate()
            var newCurrentDate = currentYear + '-' + currentMonth + '-' + currentDay   
                
            var newDate = new Date(this.date)
            var seletedDay = newDate.getDate()
            var selectedMonth = newDate.getMonth() + 1
            var selectedYear = newDate.getFullYear()
            var newFullDate = selectedYear + '-' + selectedMonth + '-' + seletedDay
            
            if(this.date === '') {
                this.dateError = true
                this.dateInvalidError = false
                this.hourError = false
                this.hourInvalidError = false
                this.minuteError = false
                this.minuteInvalidError = false
            }else {
                newFullDate < newCurrentDate ? this.dateInvalidError = true : this.dateInvalidError = false
                this.dateError = false
            }
        },
        checkTime() {
            if(this.hour !== '') {
                    if(this.minute !== '') {
                        if(this.hour <= 12){
                    if(this.minute < 60) {
                                this.hourInvalidError = false
                                this.minuteInvalidError = false
                                this.minuteError = false
                                this.hourError = false
                            }else {
                                this.minuteInvalidError = true
                                this.hourInvalidError = false
                                this.minuteError = false
                                this.hourError = false
                            }
                        }else {
                        this.minuteInvalidError = false
                        this.hourInvalidError = true
                        this.minuteError = false
                        this.hourError = false
                        }
                    }else {
                        this.hourError = false
                        this.minuteError = true
                        this.minuteInvalidError = false
                        this.hourInvalidError = false
                        this.dateError = false
                        this.dateInvalidError = false
                    }
            }else {
                this.hourError = true
                this.minuteError = false
                this.dateError = false
                this.dateInvalidError = false
                this.minuteInvalidError = false
                this.hourInvalidError = false
            }
        },
        checkResponsible(index) {
            if(this.selectedUser.toString() !== ''){       
                this.responsibleError = false                
            }else {
                this.responsibleError = true
            }
        },
        validEmail() {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(this.email) || this.email === '') {
                this.emailError = false
            }else {
                this.emailError = true
            }
        }
    },
    created() { 
        axios.get('https://api.myjson.com/bins/e8ptg') //Category json file
        .then(res => this.category = res.data)
        .catch( err => console.log(err))

        axios.get('https://api.myjson.com/bins/kshh0') //Employes json file
        .then(response => this.responsible = response.data)
        .catch(error => console.log(error))
        
    },
    computed: {
        charactersLeft() {
            
            var char = this.description.length, 
            limit = 140
            return char + '/' + limit
        },
        checkRemaining() {
            var maxLength = 140
            return this.description.length < maxLength
        }
    },
    watch: {
        description() {
            var limit = 140
            this.description = this.description.substring(0, limit)
        },
        paymentPicked() {
            this.paymentPicked == 'paid' ? this.fee = true : this.fee = false
        }
    }
}
</script>
<style scoped>
.character-limit{
    color:#FF8E1D;
}
.inputs-control{
    border:1px solid #FF831D;
    
}
.text-control{
    color: #FF831D;
}
#without_ampm::-webkit-datetime-edit-ampm-field {
    display: none;
}
.time{
    width:65px;
    text-align: center;
}
.rewardMessage{
    color:#666 !important;
    font-weight: bold;
}




.radio-custom {
    opacity: 0;
    position: absolute;   
}

.radio-custom, .radio-custom-label {
    display: inline-block;
    vertical-align: middle;
    margin: 5px;
    cursor: pointer;
}

.radio-custom-label {
    position: relative;
}

.radio-custom + .radio-custom-label:before {
    content: '';
    background: #FFF;
    border: 1px solid #8CA2C2;
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 15px;
    padding: 2px;
    margin-right: 10px;
    text-align: center;
}

.radio-custom + .radio-custom-label:before {
    border-radius: 50%;
}

.radio-custom:checked + .radio-custom-label:before {
    background: #8CA2C2;
    box-shadow: inset 0px 0px 0px 4px #fff;
}
#radio-custom2{
    color:#666;
}


</style>



