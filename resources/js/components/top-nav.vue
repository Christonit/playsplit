<template>
    <header class="app-header">

        <div class="branding">
            <a href="#" alt="playsplit-logo">
                <img src="../../img/logo.svg" alt="logo-img">
            </a>

        </div>


            <div class="top-bar">

                <button class="back-arrow">
                    <i class="material-icons ">arrow_back_ios </i>
                </button>

                <div class="search-bar">
                    <input class="form-control mr-sm-2" type="input" placeholder="Search" aria-label="Search">
                    <span class="search-dropdown">
                        <label class="search-dropdown-label">
                            Playlists
                        </label>
                    </span>
                </div>
            </div>
            <div id="top-bar-links">
                <span class="user-dropdown">
                    <span class="text highlight">{{username}}</span>
                    <img :src="user.avatar" alt="" class="user-profile-pic">
                </span>
                <div class="dropdown-items">
                    <button class="dropdown-item" href="/auth/spotify/logout"> Edit profile</button>
                    <a href="/auth/spotify/logout"> Logout</a>

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
