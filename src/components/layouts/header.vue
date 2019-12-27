<template>
    <header>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">PostJson</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#">Import</b-nav-item>
                </b-navbar-nav>
            </b-collapse>

            <b-navbar-nav center>
                <div id="loader" class="center d-none">
                    <div class="lds-css ng-scope">
                        <div style="width:100%;height:100%" class="lds-rolling">
                            <div></div>
                        </div>
                    </div>
                </div>
            </b-navbar-nav>

        </b-navbar>
    </header>
</template>
