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
                        <label>TITLE<span class="character-limit">*</span></label>
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
                        <label>DESCRIPTION<span class="character-limit">*</span></label>
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
                        <select name="" id="">
                            <option :value="index" v-for="(item, index) in category" :key="index">{{ item.name }} </option>
                        </select>
                        <span class="desc">Describe topic and people who should interested in this event</span>
                    </td>
                </tr>
                <tr>
                    <td> 
                        <label>PAYMENT</label>
                    </td>
                    <td>
                        <input type="radio" id="1" name="e-option" :checked="true" value="free" v-model="paymentPicked">Free event &nbsp;&nbsp;
                        <input type="radio" id="2" name="e-option" value="paid" v-model="paymentPicked">Paid event &nbsp;&nbsp;
                        <span v-show="fee"><input type="text" placeholder="Fee" class="number">&nbsp;&nbsp;$</span>
                    </td>
                </tr>
                <tr>
                    <td> 
                        <label>REWARD</label>
                    </td>
                    <td>
                        <input type="text" placeholder="Number" class="number">
                        &nbsp;&nbsp;reward points for attendance
                    </td>
                </tr>
            </table>
        </form>
    </div>
    <div class="coordinator">
        <h2>Coordinator</h2>
        <hr>
            <table>
                <tbody><tr>
                    <td> 
                        <label>RESPONSIBLE<span class="character-limit">*</span></label>
                    </td>
                    <td>
                        <select name="" :class="{ 'inputs-control' : responsibleError }">
                            <optgroup label="Me">
                                <option selected :value="1">Select a responsible</option>
                            </optgroup>
                            <optgroup label="Others">
                                <option :value="index" v-for="(item, index) in responsible" :key="index">{{ item.name }} {{ item.lastname }}</option>
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
                        <input type="email" placeholder="Email">
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
                        <label>STARTS ON<span style="color:red;">*</span></label>
                    </td>
                    <td>
                        <input type="date" v-model="date" :class="{ 'inputs-control' : dateError }">
                        &nbsp;&nbsp;
                        at
                        &nbsp;&nbsp;
                        <input type="time" v-model="time"  class="duration">
                        &nbsp;&nbsp;
                        <input type="radio" name="e2-option" value="am" checked="">AM &nbsp;&nbsp;
                        <input type="radio" name="e2-option" value="papmid">PM &nbsp;&nbsp;
                    </td>
                    <td>
                        <div class="error" v-show="dateError">Date cannot be empty</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>DURATION</label>
                    </td>
                    <td>
                        <input type="text" placeholder="Number" class="duration" id="duration">
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
            reward: 0,
            responsible: [],
            paymentPicked: true,
            date: '',
            time : '',
            fee: false,
            titleError: false,
            descriptionError: false,
            responsibleError: false,
            dateError: false
            
        }
    },
    methods: {
        publishEvent() {
            this.checkInputs()
            this.$router.push({ path: 'user/' + this.userId})
        },
        checkInputs() {
            this.title.length > 0 ? this.titleError = false : this.titleError = true
            this.description.length > 0 ? this.descriptionError = false : this.descriptionError = true
            this.responsible === '1' ? this.responsibleError = false : this.responsibleError = true
        },
        convertDate() {
            var AM_PM = ''
            var currentDate = new Date()
            var currentHour = currentDate.getHours()
            currentHour < 12 ? AM_PM = 'AM' : AM_PM = 'PM'
            if(currentHour === 0) {
                currentHour = 12
            }
            if(currentHour > 12) {
                currentHour = currentHour - 12;
            }
            var currentMinute = currentDate.getMinutes()
            alert(currentHour + ':' + currentMinute + ' ' + AM_PM)


        }
    },
    mounted() { 
        axios.get('https://api.myjson.com/bins/e8ptg') //Category json file
        .then(res => this.category = res.data)
        .catch( err => console.log(err))

        axios.get('https://api.myjson.com/bins/kshh0') //Employes json file
        .then(response => this.responsible = response.data)
        .catch(error => console.log(error))

        this.convertDate()

        
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
</style>



