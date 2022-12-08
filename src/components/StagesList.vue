<template>
  <ul class="stages">
    <li class="list-item" v-for="stage in this.stagesData" :key="stage.id">
      <div class="list-item__name">{{ stage.name }}</div>
      <button
        class="list-item__edit"
        @click="this.$emit('showStageSetting', stage.id)"
      ></button>
      <div class="list-item__wrapper">
        <div class="list-item__block">
          <span class="nameplate">Колличество этапов:</span>
          <span class="info">2</span>
        </div>
        <div class="list-item__block">
          <span class="nameplate">Задействовано сотрудников:</span>
          <span class="info">5</span>
        </div>
        <div class="list-item__block">
          <span class="nameplate">Стоимость стадии:</span>
          <span class="info">800 000 тг</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "StageList",
  props: {
    stagesData: Array,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.list-item__name {
  font-size: 18px;
  line-height: 120%;
  margin-bottom: 15px;
  padding-right: 60px;
}
.list-item__wrapper {
  display: flex;
  justify-content: space-between;
}
.list-item {
  position: relative;
  width: 100%;
  opacity: 0;
  animation: fromOpacity 0.25s ease-in-out forwards;
  display: flex;
  padding: 15px;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  border: 1px solid rgb(255, 255, 255, 0.3);
  border-radius: 10px;
  &:not(:last-child) {
    margin-bottom: 15px;
  }
}
.list-item__block {
  width: 33.33%;
  text-align: center;
}
.nameplate {
  font-size: 14px;
  color: rgb(255, 255, 255, 0.5);
}
.list-item__edit {
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 2;
  flex-shrink: 0;
  border-radius: 50%;
  background-image: url("data:image/svg+xml;charset=UTF-8, %3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='16' height='16' viewBox='0 0 16 16' %3e%3cpath fill='%23ffffff' d='M15.2 6l-1.1-0.2c-0.1-0.2-0.1-0.4-0.2-0.6l0.6-0.9 0.5-0.7-2.6-2.6-0.7 0.5-0.9 0.6c-0.2-0.1-0.4-0.1-0.6-0.2l-0.2-1.1-0.2-0.8h-3.6l-0.2 0.8-0.2 1.1c-0.2 0.1-0.4 0.1-0.6 0.2l-0.9-0.6-0.7-0.4-2.5 2.5 0.5 0.7 0.6 0.9c-0.2 0.2-0.2 0.4-0.3 0.6l-1.1 0.2-0.8 0.2v3.6l0.8 0.2 1.1 0.2c0.1 0.2 0.1 0.4 0.2 0.6l-0.6 0.9-0.5 0.7 2.6 2.6 0.7-0.5 0.9-0.6c0.2 0.1 0.4 0.1 0.6 0.2l0.2 1.1 0.2 0.8h3.6l0.2-0.8 0.2-1.1c0.2-0.1 0.4-0.1 0.6-0.2l0.9 0.6 0.7 0.5 2.6-2.6-0.5-0.7-0.6-0.9c0.1-0.2 0.2-0.4 0.2-0.6l1.1-0.2 0.8-0.2v-3.6l-0.8-0.2zM15 9l-1.7 0.3c-0.1 0.5-0.3 1-0.6 1.5l0.9 1.4-1.4 1.4-1.4-0.9c-0.5 0.3-1 0.5-1.5 0.6l-0.3 1.7h-2l-0.3-1.7c-0.5-0.1-1-0.3-1.5-0.6l-1.4 0.9-1.4-1.4 0.9-1.4c-0.3-0.5-0.5-1-0.6-1.5l-1.7-0.3v-2l1.7-0.3c0.1-0.5 0.3-1 0.6-1.5l-1-1.4 1.4-1.4 1.4 0.9c0.5-0.3 1-0.5 1.5-0.6l0.4-1.7h2l0.3 1.7c0.5 0.1 1 0.3 1.5 0.6l1.4-0.9 1.4 1.4-0.9 1.4c0.3 0.5 0.5 1 0.6 1.5l1.7 0.3v2z' %3e%3c/path%3e%3cpath fill='%23ffffff' d='M8 4.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5c0-1.9-1.6-3.5-3.5-3.5zM8 10.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5c0 1.4-1.1 2.5-2.5 2.5z' %3e%3c/path%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-color: rgb(4, 99, 241, 0.6);
  background-size: 68%;
  background-position: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
}
</style>
