<template>
  <div>

    <!-- 按钮 -->
    <div class="top-btn">
      <el-button type="primary" icon="el-icon-plus" @click="addHander">新增</el-button>
    </div>

    <!-- 详情框 -->
    <el-dialog :title="detailTitle" :visible.sync="detailFormVisible">
      <el-form :model="detailParams" label-width="180px">
        <el-form-item label="名称">
          <el-input v-model="detailParams.name" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="资产类型">
          <el-select v-model="detailParams.type" style="width: 400px">
            <el-option label="手机" value="0"></el-option>
            <el-option label="电脑" value="1"></el-option>
            <el-option label="其他电子产品" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="detailParams.description" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="购买价格">
          <el-input v-model="detailParams.price" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="购买时间">
          <el-date-picker type="date" v-model="detailParams.buyTime" style="width: 400px"></el-date-picker>
        </el-form-item>
        <el-form-item label="购买渠道">
          <el-select v-model="detailParams.buyChannel" style="width: 400px">
            <el-option label="京东" value="0"></el-option>
            <el-option label="淘宝" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="detailParams.status" style="width: 400px">
            <el-option label="正常使用" value="0"></el-option>
            <el-option label="二手转出" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmSave('ruleForm')">确认</el-button>
          <el-button @click="detailFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 列表 -->
    <el-table :data="tableData">
      <el-table-column prop="type" label="资产类型">
        <template slot-scope="scope">
          <span v-show="scope.row.status === '0'">手机</span>
          <span v-show="scope.row.status === '1'">电脑</span>
          <span v-show="scope.row.status === '2'">其他电子产品</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="price" label="购买价格"></el-table-column>
      <el-table-column prop="buyTime" label="购买时间"></el-table-column>
      <el-table-column prop="buyChannel" label="购买渠道">
        <template slot-scope="scope">
          <span v-show="scope.row.buyChannel === '0'">京东</span>
          <span v-show="scope.row.buyChannel === '1'">淘宝</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-show="scope.row.status === '0'">正常使用</span>
          <span v-show="scope.row.status === '1'">二手转出</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editHander(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteHander(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页插件 -->
    <el-pagination class="bottom-page" layout="total, sizes, prev, pager, next, jumper" :total="total" :current-page.sync="currentPage" :page-size="pageSize" @size-change="limitChange" @current-change="startChange"></el-pagination>
  </div>
</template>
<script>
import {
  queryGoodsList,
  saveGoods,
  deleteById,
} from "@/components/api/assetApi.js";

export default {
  data() {
    return {
      queryFormVisible: false,
      queryParams: {},
      currentPage: 1, // 当前页
      pageSize: 10, // 每页记录数
      total: null, // 列表总记录数
      tableData: [], // 列表数据
      detailFormVisible: false,
      detailTitle: "",
      detailParams: {
        name: null,
        type: null,
        description: null,
        price: null,
        buyTime: null,
        buyChannel: null,
      },
    };
  },
  methods: {
    //查询资产列表
    queryGoodsList() {
      queryGoodsList(this.queryParams, this.currentPage, this.pageSize).then(
        (response) => {
          this.tableData = response.data.list;
          this.total = response.data.total;
        }
      );
    },
    //保存
    saveGoods(params) {
      saveGoods(params).then((response) => {
        let flag = response.data;
        if (flag) {
          this.detailFormVisible = false;
          this.queryGoodsList();
        }
      });
    },
    //删除
    deleteById(id) {
      deleteById(id).then((response) => {
        let flag = response.data;
        if (flag) {
          this.queryGoodsList();
        }
      });
    },
    limitChange(pageSize) {
      this.currentPage = 1;
      this.pageSize = pageSize;
      this.queryGoodsList();
    },
    startChange(currentPage) {
      this.currentPage = currentPage;
      this.queryGoodsList();
    },
    addHander() {
      let detailNew = {
        name: null,
        type: null,
        description: null,
        price: null,
        buyTime: null,
        buyChannel: null,
      };
      this.detailParams = detailNew;
      this.detailTitle = "新增";
      this.detailFormVisible = true;
    },
    confirmSave(formName) {
      this.saveGoods(this.detailParams);
    },
    editHander(row) {
      this.detailParams = JSON.parse(JSON.stringify(row));
      this.detailTitle = "编辑";
      this.detailFormVisible = true;
    },
    deleteHander(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteById(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.queryGoodsList();
  },
};
</script>
<style>
.top-btn {
  float: left;
  margin: 10px;
}
.bottom-page {
  float: left;
  margin: 10px;
}
</style>