<template>
  <section class="nav-bar">
    <button
      @click="openPage(event, 'Repository Backup')"
      class="active btn tablinks"
    >
      Repository Backup
    </button>
    <button @click="openPage(event, 'Repository Reports')" class="btn tablinks">
      Repository Reports
    </button>
    <button @click="openPage(event, 'Backup Reports')" class="btn tablinks">
      Backup Reports
    </button>
    <button @click="openPage(event, 'UserInfo')" class="btn tablinks">
      UserInfo
    </button>
    <button @click="openPage(event, 'logOut')" class="btn tablinks">
      logout
    </button>
  </section>
  <section id="Repository Backup" class="active tabcontent">
    <div class="content">
      <h1 class="heading">Dowell Github Backup</h1>
      <input type="text" name="reponame" placeholder="Respository Name" />
      <input type="text" name="repourl" placeholder="Repository URL" />
      <button type="submit" class="btn">Submit</button>
    </div>
  </section>
  <section id="Repository Reports" class="tabcontent">
    <div class="content">
      <h1 class="heading">Repository Reports</h1>
    </div>
    <table class="table mx-5">
      <thead>
        <th>repository_name</th>
        <th>repository_url</th>
        <th>function_number</th>
        <th>webhook_link</th>
      </thead>
      <tbody>
        <tr v-for="(value, key) in items" :key="key">
          <td>
            {{ value["repository_name"] }}
          </td>
          <td>
            {{ value["repository_url"] }}
          </td>
          <td>
            {{ value["function_number"] }}
          </td>
          <td>
            {{ value["webhook_link"] }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <section id="Backup Reports" class="tabcontent">
    <div class="content">
      <h1 class="heading">Backup Reports</h1>
    </div>
    <table class="table mx-5">
      <thead>
        <th>repository_names</th>
        <th>zip_file_names</th>
      </thead>
      <tbody>
        <tr v-for="(data, key) in items1.repository_names" :key="key">
          <td>
            {{ data }}
          </td>
          <td>
            {{ items1.zip_file_names[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <section id="UserInfo" class="tabcontent">
    <div class="content">
      <h1 class="heading">UserInfo</h1>
    </div>
  </section>
  <section id="logOut" class="tabcontent"></section>
</template>
<script>
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
export default {
  data() {
    return {
      items: [],
      columns: [],
      items1: [],
    };
  },
  mounted() {
    //   if session id exist{
    //     sessiondata = "id"
    //     send the post request with (https://100014.pythonanywhere.com/api/userinfo/{session data})

    //   }
    //   else{
    //     const dowellLoginUrl =
    // "https://100014.pythonanywhere.com/?redirect_url=" +
    // window.location.origin +
    // "/100018-dowellWorkflowAi-testing/%23";
    //   }
    const sessionId = this.$route.params.sessionId;

    if (sessionId) {
      console.log("Session ID exists");
    } else {
      console.log("Session ID does not exist");
      const dowellLoginUrl =
        "https://100014.pythonanywhere.com/?redirect_url=" +
        window.location.origin;
      // "/100018-dowellWorkflowAi-testing/%23";
      // this.$router.replace(dowellLoginUrl);
      window.location.replace(dowellLoginUrl);
    }
    // const sessionId = this.$route.query.sessionId;
    // if (!sessionId) {
    //   this.$router.push("https://100014.pythonanywhere.com/");
    //   console.log("love");
    // }
    this.getData();
  },
  methods: {
    openPage(evt, pageName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
      }
      document.getElementById(pageName).style.display = "block";
      evt.currentTarget.className += "active";
    },

    async getData() {
      const config = {
        headers: {
          Accept: "application/json",
        },
      };
      try {
        const response = await axios.get(
          "http://100045.pythonanywhere.com/reports/get-respository-reports/",
          config
        );
        this.items = response.data.info;
        console.log(this.items.info);
        const response2 = await axios.get(
          "http://100045.pythonanywhere.com/reports/get-backup-reports/",
          config
        );
        console.log(response2.data);
        this.items1 = response2.data;
        // this.columns = response2.data.zip_file_names;

        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
