<template>
    <div class="fontheadercon">
        <div class="fontheader">
            <div class="fontheader-logo"><img src="../assets/logo.png"/>秀链子</div>
            <ul>
                <router-link to='/front' tag="li">文章</router-link>
                <router-link to='/tag' tag="li">标签</router-link>
                <router-link to='/aboutme' tag="li">关于我</router-link>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.fontheadercon{
    width:100%;
    height: 0.66rem;
    line-height: 0.66rem;
    border-bottom: solid 1px #ccc;
    font-size: 0.18rem;
    .fontheader{
        width:80%;
        max-width: 1000px;
        margin: auto;
        display: flex;
        display: -webkit-flex; 
        &-logo{
            & img{
                width: 0.4rem;
                height: 0.4rem;
                margin-right: 10px;
            }
        }
        & ul{
            flex: 1;
            text-align: right;
            & li{
                display: inline-block;
                margin: 0 10px;
                padding: 0 5px;
                cursor: pointer;
                height: 0.3rem;
                line-height: 0.3rem;
                &:hover{
                    color: #18bc9c;
                }
                &.active{
                    border-bottom: solid 2px #18bc9c;
                    color: #18bc9c;
                }
            }
        }
    }
}
@media (max-width: 767px) {
    .fontheadercon{
        height: auto;
        line-height: normal;
        .fontheader{
            display: block;
            padding: 10px 0 5px 0;
            & ul{
                text-align: left;
            }
        }
    }
}
</style>
