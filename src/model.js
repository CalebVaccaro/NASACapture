var app = new Vue({
  el: "#app",
  data: {
    title: "NASA PICTURE",
    apod: {
      date: "",
      explanation: "",
      url: "",
      title: ""
    },
    epic: [],
    hubble: {
      name: "Comet P/Shoemaker-Levy 10",
      news_name: "i",
      mission: "hubble",
      collection: "news",
      image_files: [
        {
          file_url: "",
          file_size: 0,
          width: 0,
          height: 0
        }
      ]
    },
    dataset: [],
    noteset: [],
    questions: [],
    daynotes: 0,
    notestate: 0,
    noteselected: "NoteSet",
    dateselected: "Dates",
    currnetBK: "",
    datasetday: 0,
    datastate: 1,
    incrementor: 0,
    backgroundimg: 0,
    backgroundNames: [],
    month: 12,
    day: 01,
    year: 2019,
    showModal: true,
    modalheader: "NASACapture Login",
    modalbody: "",
    hubblepicture: 200,
    ifLoggedIn: false,
    ifAddNoteset: false,
    ifAddDataset: false,
    ifAddRow: false,
    ifAddColumn: false,
    notesetDropdown: "",
    newNoteSetTitle: "Title",
    newNoteSet: "starting notes...",
    username: "",
    password: "",
    user: {},
    loginerror: false,
    usernameUsed: false,
    credentialsFalse: false,
    errorloading: false,
    needInfo: false,
    questions: [],
    question: "**Welcome to NASA Capture**"
  },
  components: {
    noteset: "dataset"
  },
  mounted() {
    // let parameters = this.$route.query;
    // console.log(parameters);
    if (localStorage.backgroundimg != undefined) {
      if (localStorage.backgroundimg > 12) {
        localStorage.backgroundimg = 12;
        this.backgroundimg = localStorage.backgroundimg;
      }

      if (localStorage.backgroundimg < 0) {
        localStorage.backgroundimg = 0;
        this.backgroundimg = localStorage.backgroundimg;
      }

      this.backgroundimg = localStorage.backgroundimg;
      document.body.style.backgroundImage =
        "url(style/media/" +
        this.backgroundNames[localStorage.backgroundimg] +
        ".jpg)";

      if (this.username == "") {
        document.body.style.backgroundImage = "url(style/media/iss.jpg)";
      }
      this.bkCalc();
    } else {
      this.backgroundimg = 0;
      localStorage.backgroundimg = this.backgroundimg;
      document.body.style.backgroundImage =
        "url(style/media/" +
        this.backgroundNames[localStorage.backgroundimg] +
        ".jpg)";
      this.bkCalc();
    }

    if (localStorage.hubblepicture != undefined) {
      this.hubblepicture = localStorage.hubblepicture;
      this.get_NASAHUBBLE();
    } else {
      localStorage.hubblepicture = this.hubblepicture;
      this.get_NASAHUBBLE();
    }
  },
  methods: {
    get_NASAAPOD() {
      //if (! this.term.trim()) return;
      fetch(
        "https://api.nasa.gov/planetary/apod?date=" +
          this.year +
          "-" +
          this.month +
          "-" +
          this.day +
          "&api_key=QxjBzfgWWJSju4kVGWvscRrlxgLh2FfhaFZZ30ij"
      )
        .then(response => {
          if (!response.ok) {
            throw Error(`ERROR: ${response.statusText}`);
          }
          return response.json();
        })
        .then(json => {
          this.apod = json;
        });
    },
    get_NASAEPIC() {
      fetch(
        "https://api.nasa.gov/EPIC/api/natural?api_key=QxjBzfgWWJSju4kVGWvscRrlxgLh2FfhaFZZ30ij"
      )
        .then(response1 => {
          if (!response1.ok) {
            throw Error(`ERROR: ${response1.statusText}`);
          }
          return response1.json();
        })
        .then(json1 => {
          this.epic = json1;
        });
    },
    get_NASAHUBBLE() {
      fetch(
        "https://cors-anywhere.herokuapp.com/http://hubblesite.org/api/v2/image/" +
          this.hubblepicture
      )
        .then(response2 => {
          if (!response2.ok) {
            throw Error(`ERROR: ${response2.statusText}`);
          }
          return response2.json();
        })
        .then(json2 => {
          this.hubble = json2;
        });
    },
    incrementBackgroundImg() {
      if (localStorage.backgroundimg < 12) {
        this.backgroundimg = localStorage.backgroundimg;
        this.backgroundimg++;
        localStorage.backgroundimg = this.backgroundimg;
        this.user.bkpic = this.backgroundimg;

        document.body.style.backgroundImage =
          "url(style/media/" +
          this.backgroundNames[this.backgroundimg] +
          ".jpg)";
        this.bkCalc();
      }
    },
    decrementBackgroundImg() {
      if (localStorage.backgroundimg > 0) {
        this.backgroundimg = localStorage.backgroundimg;
        this.backgroundimg--;
        localStorage.backgroundimg = this.backgroundimg;
        this.user.bkpic = this.backgroundimg;

        document.body.style.backgroundImage =
          "url(style/media/" +
          this.backgroundNames[this.backgroundimg] +
          ".jpg)";
        this.bkCalc();
      }
    },
    incrementEPIC() {
      if (this.incrementor < 11) {
        this.incrementor += 1;
      } else {
        this.incrementor = 0;
      }
    },
    decrementEPIC() {
      if (this.incrementor > 0) {
        this.incrementor -= 1;
      } else {
        this.incrementor = 11;
      }
    },
    incrementAPOD() {
      if (this.month == 2) {
        if (this.day < 28) {
          this.day += 1;
        } else {
          this.month += 1;
        }
      }
      if (
        this.month == 1 ||
        this.month == 3 ||
        this.month == 5 ||
        this.month == 7 ||
        this.month == 8 ||
        this.month == 10 ||
        this.month == 12
      ) {
        if (this.day < 31) {
          this.day += 1;
        } else {
          if (this.month < 12) {
            this.month += 1;
          } else {
            this.month = 1;
          }
        }
      }
      if (
        this.month == 4 ||
        this.month == 6 ||
        this.month == 9 ||
        this.month == 11
      ) {
        if (this.day < 30) {
          this.day += 1;
        } else {
          this.month += 1;
          this.day = 1;
        }
      }
      this.get_NASAAPOD();
    },
    decrementAPOD() {
      if (this.day > 1) {
        this.day -= 1;
      } else {
        this.day = 28;
        if (this.month > 1) {
          this.month -= 1;
        } else {
          this.month -= 1;
          this.year -= 1;
        }
      }
      this.get_NASAAPOD();
    },
    nextNoteset() {
      if (this.noteset[this.daynotes].obj.length - 1 > this.notestate) {
        this.notestate += 1;

        let item = this.noteset[this.daynotes].obj[this.notestate];
        for (
          let index = 0;
          index < this.noteset[this.daynotes].obj.length;
          index++
        ) {
          const element = this.noteset[this.daynotes].obj[index];

          if (element.title == item.title) {
            this.noteselected = element;
            return;
          }
        }
      }
    },
    previousNoteset() {
      if (this.notestate > 0) {
        this.notestate -= 1;
        let item = this.noteset[this.daynotes].obj[this.notestate];
        for (
          let index = 0;
          index < this.noteset[this.daynotes].obj.length;
          index++
        ) {
          const element = this.noteset[this.daynotes].obj[index];

          if (element.title == item.title) {
            this.noteselected = element;
            return;
          }
        }
      }
    },
    nextdayNoteset() {
      if (this.noteset.length - 1 > this.daynotes) {
        this.daynotes += 1;
        this.notesetDropdown;

        for (let index = 0; index < this.noteset.length; index++) {
          const element = this.noteset[index];

          if (this.daynotes == index) {
            this.dateselected = element;
          }
        }
      }
    },
    previousdayNoteset() {
      if (this.daynotes > 0) {
        this.daynotes -= 1;
        for (let index = 0; index < this.noteset.length; index++) {
          const element = this.noteset[index];

          if (this.daynotes == index) {
            this.dateselected = element;
          }
        }
      }
    },
    nextDataset() {
      if (this.dataset[this.datasetday].length - 1 > this.datastate) {
        this.datastate += 1;
      }
    },
    previousDataset() {
      if (this.datastate > 0) {
        this.datastate -= 1;
      }
    },
    nextdayDataset() {
      if (this.noteset.length - 1 > this.datasetday) {
        this.datasetday += 1;
      }
    },
    previousdayDatasset() {
      if (this.datasetday > 0) {
        this.datasetday -= 1;
      }
    },
    previousHubble() {
      if (this.hubblepicture > 0) {
        this.hubblepicture--;
        localStorage.hubblepicture = this.hubblepicture;
      }
      this.user.hubblepic = this.hubblepicture;
      this.get_NASAHUBBLE();
    },
    nextHubble() {
      this.hubblepicture++;
      localStorage.hubblepicture = this.hubblepicture;
      this.user.hubblepic = this.hubblepicture;

      this.get_NASAHUBBLE();
    },
    populateBackgroundNames() {
      this.backgroundNames = {
        0: "SaturnV",
        1: "Earth",
        2: "SpaceShuttle",
        3: "Moon",
        4: "Venus",
        5: "Mars",
        6: "Saturn",
        7: "Jupiter",
        8: "Uranus",
        9: "Neptune",
        10: "CrabNebula",
        11: "MilkywayGalaxy",
        12: "Void"
      };

      document.body.style.backgroundImage =
        "url(style/media/" +
        this.backgroundNames[localStorage.backgroundimg] +
        ".jpg)";

      document.body.style.backgroundImage = "url(style/media/iss.jpg)";
    },
    populateQuestions() {
      this.questions = [
        "How old is the universe?",
        "Why is the universe expanding?",
        "What is Gravity?",
        "If the universe is potentially infinite, can we safely say that other intelligent life exists somewhere within it? (aka Are there Aliens?)",
        "What is it like inside a black hole?",
        "What happens when you travel faster than the speed of light?",
        "Is the Solar System an Atom?",
        "Is time travel possible, and if so, how could it hypothetically be achieved?",
        "Where are the White Holes?!"
      ];
    },
    findQuestion() {
      let rand = getRndInteger(0, this.questions.length - 1);
      this.question = "Question of the Day: " + this.questions[rand];
    },
    populateNoteset() {
      var d = new Date();

      var newdate = d.toLocaleDateString();

      let dstring = d.toString();
      let secondDate = new Date(2019, 10, 22);
      var secondDateshort = secondDate.toLocaleDateString();
      this.noteset = [
        {
          date: newdate,
          obj: [
            {
              title: "planets",
              notes: "planets are cool"
            },
            {
              title: "weather patterns",
              notes: "weather is cool"
            },
            {
              title: "galaxies",
              notes: "Galaxies are awesome"
            },
            {
              title: "UFO",
              notes: "I swear I saw one!"
            }
          ]
        }
      ];
    },
    populateDataset() {
      // ["Earth", "Saturn"] = array of data
    },
    addDataset() {
      this.ifAddDataset = true;
      this.showModal = true;
      this.modalheader = "New DataSet";
    },
    addRow() {
      this.ifAddRow = true;
      this.showModal = true;
      this.modalheader = "New Row";
    },
    addColumn() {
      this.ifAddColumn = true;
      this.showModal = true;
      this.modalheader = "New Column";
    },
    addNoteset() {
      this.ifAddNoteset = true;
      this.showModal = true;
      this.modalheader = "New NoteSet";
    },
    saveNoteset() {},
    closeSets() {
      if (this.ifAddDataset) {
      } else if (this.ifAddNoteset) {
        d = {
          title: "stars",
          notes: "super crazy, out of this world"
        };

        this.noteset[0].obj.push(d);
        this.sendData();
      } else if (this.ifAddColumn) {
      } else if (this.ifAddColumn) {
      } else if (this.ifAddRow) {
      }

      this.ifAddDataset = false;
      this.ifAddNoteset = false;
      this.ifAddColumn = false;
      this.ifAddRow = false;
      this.showModal = false;
    },
    cancelModal() {
      this.ifAddDataset = false;
      this.ifAddNoteset = false;
      this.ifAddColumn = false;
      this.ifAddRow = false;
      this.showModal = false;
      this.showModal = false;
    },
    closeModal() {
      let item = this.noteset[this.daynotes].obj.length;
      for (
        let index = 0;
        index < this.noteset[this.daynotes].obj.length;
        index++
      ) {
        const element = this.noteset[this.daynotes].obj[index];

        if (element.title == this.noteselected.title) {
          this.notestate = index;
          return;
        }
      }
    },
    dropdownDate() {
      let item = this.noteset.length;
      for (let index = 0; index < this.noteset.length; index++) {
        const element = this.noteset[index];

        if (element.date == this.dateselected.date) {
          this.daynotes = index;
          return;
        }
      }
    },
    presentDate() {
      let item = this.noteset.length;
      for (let index = 0; index < this.noteset.length; index++) {
        const element = this.noteset[index];

        var currentdate = new Date();
        this.month = currentdate.getMonth() + 1;
        this.day = currentdate.getDate();
        this.year = currentdate.getFullYear();

        let eMonth = element.date.split("/")[0];
        let eDay = element.date.split("/")[1];
        let eYear = element.date.split("/")[2];

        let nMonth = parseInt(eMonth);
        let nDay = parseInt(eDay);
        let nYear = parseInt(eYear);

        if (nMonth == this.month && nDay && this.year == nYear) {
          this.daynotes = index;
          this.dateselected = element;
          return;
        }
      }
    },
    searchHubble() {
      localStorage.hubblepicture = this.hubblepicture;
      this.get_NASAHUBBLE();
    },
    searchAPOD() {
      this.get_NASAAPOD();
    },
    presentAPOD() {
      var currentdate = new Date();
      this.month = currentdate.getMonth() + 1;
      this.day = currentdate.getDate();
      this.year = currentdate.getFullYear();
      this.get_NASAAPOD();
    },
    findNoteSet() {
      //this.noteselected = event.target.value;
      const found = this.noteset[this.daynotes].find(
        object => object.title === this.noteselected
      );
    },
    randomizeHubble() {
      this.hubblepicture = Math.floor(Math.random() * (4100 - 0)) + 0;
      localStorage.hubblepicture = this.hubblepicture;
      this.get_NASAHUBBLE();
    },
    bkCalc() {
      this.currnetBK = this.backgroundNames[this.backgroundimg];
    },
    createNewAccount() {
      if (
        this.username == "" ||
        this.username == undefined ||
        this.password == "" ||
        this.password == undefined
      ) {
        this.needInfo = true;
        return;
      }
      this.user = new user(
        this.username,
        this.password,
        this.noteset,
        this.hubblepicture,
        this.backgroundimg
      );

      // send new user account to firebase
      // Send Data to Database

      // #1 - get a reference to the databse
      let database = firebase.database();

      // #2 - refer to a root node named `scores`
      let ref = database.ref("rdata/" + this.username);

      let check = true;
      // DANDEROUS METHOD
      firebase
        .database()
        .ref("rdata")
        .once(
          "value",
          data => {
            let obj = data.val();

            for (let key of Object.keys(obj)) {
              // use for..in to interate through object keys
              let row = obj[key];
              let newuser = new user(
                row.username,
                row.password,
                row.noteset,
                row.hubblepic,
                row.bkpic
              );
              //! ERROR
              if (newuser.username == this.username) {
                this.usernameUsed = true;
                check = false;
                return;
              }
            }
          },
          firebaseError
        );

      if (check) {
        this.user = new user(
          this.username,
          this.username,
          this.password,
          this.noteset,
          this.hubblepicture,
          this.backgroundimg
        );

        let newObj = {
          key: this.username,
          username: this.username,
          password: this.password,
          noteset: this.noteset,
          hubblepic: this.hubblepicture,
          bkpic: this.backgroundimg
        };
        let newDataRef = ref.push(newObj);
        this.ifLoggedIn = true;
        this.showModal = false;
      }
    },
    checkCredentials() {
      if (
        this.username == "" ||
        this.username == undefined ||
        this.password == "" ||
        this.password == undefined
      ) {
        this.needInfo = true;
        return;
      }
      // #1 - get a reference to the databse
      //let database = firebase.database();

      firebase
        .database()
        .ref("rdata")
        .once(
          "value",
          data => {
            let obj = data.val();
            let check = true;

            for (let key of Object.keys(obj)) {
              // use for..in to interate through object keys
              let row = obj[key];
              let guidNode = Object.values(row);
              let newuser = new user(
                guidNode[4],
                guidNode[3],
                guidNode[2],
                guidNode[1],
                guidNode[0]
              );
              if (key == this.username) {
                if (newuser.password == this.password) {
                  single_obj = newuser;
                  this.user = single_obj;
                  this.ifLoggedIn = true;
                  this.showModal = false;
                  check = false;

                  this.hubblepicture = this.user.hubblepic;
                  this.backgroundimg = this.user.bkpic;
                  localStorage.backgroundimg = this.backgroundimg;
                  this.noteset = this.user.noteset;

                  document.body.style.backgroundImage =
                    "url(style/media/" +
                    this.backgroundNames[this.backgroundimg] +
                    ".jpg)";
                  this.get_NASAHUBBLE();
                  this.findQuestion();
                  return;
                } else {
                  this.loginerror = true;
                  return;
                }
              }
            }

            if (check) {
              this.credentialsFalse = true;
            }
          },
          firebaseError
        );
    },
    saveData() {
      firebase
        .database()
        .ref("rdata/" + this.username)
        .set({
          username: this.username,
          password: this.password,
          noteset: this.noteset,
          hubblepic: this.hubblepicture,
          bkpic: this.backgroundimg
        });
      this.showModal = false;
    },
    sendData() {
      //#3 - create some data
      let newdata = {
        title: this.newNoteSetTitle,
        notes: this.newNoteSet
      };

      this.noteset[this.daynotes].obj.push(newdata);

      this.user.noteset = this.noteset;

      //ref = [];
      // #4 - send data, in this case we are adding it to the `scores` node
      // let newDataRef = ref(this.user.username).set({
      //   noteset : this.user.noteset
      // });

      firebase
        .database()
        .ref("rdata/" + this.username)
        .set({
          username: this.username,
          password: this.password,
          noteset: this.noteset,
          hubblepic: this.hubblepicture,
          bkpic: this.backgroundimg
        });
      this.showModal = false;
    }
  },
  computed: {
    apodParams() {
      const params = new URLSearchParams();
      params.append("data", this.apod.date);
      return params;
    },
    footerCalc: function() {
      return "planets";
    }
  },
  watch: {
    test() {
      if (noteselected != "") {
      }
    }
  },
  created: function() {
    // SETUP
    var currentdate = new Date();
    this.month = currentdate.getMonth() + 1;
    this.day = currentdate.getDate();
    this.year = currentdate.getFullYear();

    this.get_NASAAPOD();
    this.get_NASAEPIC();
    this.get_NASAHUBBLE();
    this.populateBackgroundNames();
    this.populateQuestions();
    this.populateNoteset();
    //this.populateDataset();

    var firebaseConfig = {
      apiKey: "AIzaSyAhTVpK_0bTIntviKDy4fZAgYvC6Ze02Eg",
      authDomain: "nasacapture.firebaseapp.com",
      databaseURL: "https://nasacapture.firebaseio.com",
      projectId: "nasacapture",
      storageBucket: "nasacapture.appspot.com",
      messagingSenderId: "774102737935",
      appId: "1:774102737935:web:f511eb0a5f2167dc81af7a",
      measurementId: "G-NWQB8PQT98"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    Vue.component("v-select", VueSelect.VueSelect);
  }
});

class user {

  constructor(userId, password, noteset, hubblepic, bkpic) {
    this.username = userId;
    this.password = password;
    this.noteset = noteset;
    this.hubblepic = hubblepic;
    this.bkpic = bkpic;
  }
}

function firebaseError(error) {
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
