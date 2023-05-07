<template>
    <div class="container mb-5">
        <div class="row">
            <h2>Welcome To Notifications Component... &hearts; </h2>
            <hr>
            <div class="content d-flex flex-column w-75 m-auto" style="height: 700px">
                
                <div class="appHeader border border-primary shadow bg-light text-info fs-3 my-3 p-3 bg-body-tertiary rounded">
                    Messanger App
                </div>
                <!-- End Of App Header -->
                
                <div ref="notifications" class="appContent flex-grow-1 overflow-auto border border-primary shadow bg-light my-3 p-3 bg-body-tertiary rounded " style="max-height:700px">
                    <div v-for="message in newMessages" :key="message._id" :class="getClass(message.userId)">
                        <div class="my-3 p-3">

                            <div class="msg">
                                {{ message.content }}
                                
                                <sub class="text-info">
                                    {{ formatDate(message.createdAt) }}
                                    {{ formatTime(message.createdAt) }}
                                </sub>
                            </div>

                            <div>
                                <a @click="deleteNotify(message._id)" class="btn btn-icon btn-light text-danger rounded-pill m-2 shadow bg-body-tertiary rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                        height="16" fill="currentColor" class="bi bi-trash3"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                    </svg>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- End Of App Content 'Messages' -->
                
                <div class="appMessage">
                    <div class="d-flex">
                        <input v-model="inputValue" @keydown.enter="notify" type="text" name="content" class="border border-success shadow bg-light w-100 my-3 me-2 fs-3 px-3 p-1 bg-body-tertiary rounded ">
                        <div @click="notify" class="send my-3 btn btn-icon btn-light text-primary rounded-pill m-2 shadow bg-body-tertiary rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-send p-1" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <!-- End Of App Input -->
            </div>
        </div>
    </div>
</template>


<script>
import moment from 'moment';

export default {
    data() {
        return {
            newMessages: [],
            inputValue: '',
            myId: localStorage.getItem('userId'), //"6457ff378a1590aae66bdbca",
            otherId:localStorage.getItem('userId') //"6457ff378a1590aae66bdbcd"
        }
    },
    created() {
        this.fetchNotifictions();
        this.test();
    },
    computed: {
        getClass(){
            return function(userId){
                return {
                    'custome1': userId === this.myId,
                    'custome2': userId === this.otherId
                }
            }
        }
    },
    updated(){
        this.scroll();
    },
    methods: {
        formatDate(date){
            return moment(date).format('DD-MM-YYYY');
        },
        formatTime(time){
            return moment(time).format('h:mm A');
        },
        async fetchNotifictions(){
            try{
                let response = await fetch("http://127.0.0.1:3000/notifications");
                let data = await response.json();
                this.newMessages = data.data;
            }catch(error){
                alert(error)
            }
        },
        test(){
            setInterval(this.fetchNotifictions, 3000);
        },
        async notify(){
            let response = await fetch("http://127.0.0.1:3000/notifications", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }, 
                body: JSON.stringify({
                    content: this.inputValue,
                    userId: this.myId
                })
            })

            this.inputValue = ''
            let newData = await response.json();
            this.newMessages.push(newData.data)
            console.log(this.myId)
        },
        async deleteNotify(_id){
            await fetch(`http://127.0.0.1:3000/notifications/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            this.newMessages.splice(this.newMessages.findIndex((msg)=> msg._id === _id), 1)
        },
        scroll(){
            const container = this.$refs.notifications;
            container.scrollTop = container.scrollHeight;
        }
    }
}
</script>


<style scoped>
    .send:hover{
        background-color: rgb(194, 224, 224);
        cursor: pointer;
    }

    .custome1{
        background: rgba(24, 38, 195, 0.7);
        border-radius: 15px;
        color: #fff;
    }

    .custome2{
        background: rgba(153, 202, 235, 0.5);
        border-radius: 15px;
    }
</style>