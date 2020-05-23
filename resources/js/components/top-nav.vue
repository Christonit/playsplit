<template>
    <header class="app-header">

        <div class="branding">
            <a href="#" alt="playsplit-logo">
                <img src="../../img/logo.svg" alt="logo-img">
            </a>

        </div>


            <div class="top-navigation">

                <button class="material-icons back-arrow">arrow_back_ios</button>
                <div class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </div>
            </div>
            <div id="top-bar-links">
                <span class="user-dropdown">
                    <span class="text highlight">{{username}}</span>
                    <img :src="user.avatar" alt="" class="user-profile-pic">
                </span>
                <div class="dropdown-items">
                    <a href="/auth/spotify/logout"> Logout</a>
                    <a href="/auth/spotify/logout"> Edit profile</a>
                </div>
            </div>
        
    </header>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        name:'top-nav',
        mounted() {
            
        },
        computed:{
            ...mapState(['user']),
            username(){
                if(this.user != ''){

                    return this.user.name.split(' ').slice(0,2).join(' ')
                
                }
            }
            
        }
    }
</script>
