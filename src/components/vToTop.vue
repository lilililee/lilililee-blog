<template>
	<div class="to-top">
		<i class="el-icon-caret-top to-top-btn" @click="toTop" :class="{show:isShowToTop}"></i>
	</div>
</template>
<script>
	export default {
		name: 'vToTop',
		data () {
			return {
				scrollTop: 0
			}

		},
		computed: {
			isShowToTop() {
				return this.scrollTop > 500? true:false;
			}
		},
		methods: {
			toTop() {
			  let totalDistance = document.body.scrollTop;
	          let duringTime = 300;    // 动画总耗时
	          let stepTime = 13;        // 单次动画执行时间  
	          let steps = Math.floor(duringTime / stepTime);   // 动画需执行的次数
	          let stepDistance = totalDistance / steps;
	          let count = 0;            

	          let intervalId = setInterval(() => {
	          	if( count >= steps) {
	          		document.body.scrollTop = 0;
	          		clearInterval(intervalId)
	          	} else {
	          		count++;
	          		document.body.scrollTop -= stepDistance;
	          	}  
	          }, 13);          
	      }
	  },
	  mounted(){
	  	window.addEventListener('scroll',()=>{	       
	        this.scrollTop = document.body.scrollTop;
	    })
	  }
	}
</script>
<style lang="scss" type="text/css">
	$backColor: #58b7ff;
	$textColor: #fff;
	.to-top {
		position: fixed;
		right: 5%;
		bottom: 5%;
		
		.to-top-btn {
			color: $textColor;
			width: 40px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			background: $backColor;
			border-radius: 50%;
			cursor: pointer;
			transition: all 0.5s;

			transform: translateY(10px);
			visibility: hidden;
			opacity: 0;

			&:hover {
				background: darken($backColor, 10%)
			}

			&.show {
				transform: translateY(0);
				visibility: visible;
				opacity: 1;
			}
		}

		
	}

</style>