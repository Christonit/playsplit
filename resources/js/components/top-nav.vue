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
                    <span class="text">Christopher Santana</span>
                    <img src="#" alt="" class="user-profile-pic">
                </span>
                <div class="dropdown-items">
                    <a href="/auth/spotify/logout"> Logout</a>
                    <a href="/auth/spotify/logout"> Edit profile</a>
                </div>
            </div>
        
    </header>
</template>

<script>
    export default {
        name:'top-nav',
        mounted() {
            
        }
    }
</script>
