document.addEventListener("DOMContentLoaded", function () {
    // Activate sidebar nav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPagePremier(page);
                        
                        if (page == "#" || page == "premier") {
                            page == "premier";
                            loadPagePremier(page);
                        }
                        else if (page == "premierteams") {
                            premierTeam(page);
                        }
                        else if (page == "laliga") {
                            loadPageLaliga(page);
                        }
                        else if (page == "bundesliga") {
                            loadPageBundesliga(page);
                        }
                        else if (page == "favteam") {
                            favTeam(page);
                        };
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    //Premier League Teams
    function premierTeam(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                var content = document.querySelector("#body-content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                    getAllTeams();
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }


    //Favorite Team
    function favTeam(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                var content = document.querySelector("#body-content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                    console.log("Go To Favorite Team Page !!");
                    getFavoriteTeams();
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }

    // Load pages content
    var page = window.location.hash.substr(1);
    if (page === "") page = "premier";
    loadPagePremier(page);

    function loadPagePremier(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                var content = document.querySelector("#body-content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                    getAllStandingsPremier()
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }

    function loadPageLaliga(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                var content = document.querySelector("#body-content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                    getAllStandingsLaliga()
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }

    function loadPageBundesliga(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                var content = document.querySelector("#body-content");
                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                    getAllStandingsBundes()
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }



});