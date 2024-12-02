$(document).ready(function () {
    $('.sidenav').sidenav();
});

$(document).ready(function () {
    $('.parallax').parallax();
});

$(document).ready(function () {
    $('.scrollspy').scrollSpy();
});

$('#theme').change(function () {
    if (this.checked) {
        $("body").addClass("grey darken-4");
        $("body").addClass("white-text");
        $("body").removeClass("white");
        $("body").removeClass("text-darken-2");
    } else {
        $("body").addClass("white");
        $("body").addClass("text-darken-2");
        $("body").removeClass("grey darken-4");
        $("body").removeClass("white-text");
    }
});

$(document).ready(function () {
    $('select').formSelect();

    $.ajax({
        url: "names.txt",
        dataType: "text",
        success: function (txtContent) {
            var arrayNames = txtContent.split(/\s+/);
            var showNames = arrayNames.slice(0, 200);
            $("#namesList").html(showNames.join("<br>"));

            var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

            let listaHTML = letters.map(letter => `
              <li class="waves-effect"><a href="#!">${letter}</a></li>
            `).join('');

            $("#pagination").html(listaHTML);

            var letras = $("#pagination").children();

            letras.each(function (index, element) {
                $(element).click(function () {
                  var letra = $(this).text();
                  console.log(letra);
                  var results = arrayNames.filter(name => name.startsWith(letra));
                  var showNames = results.slice(0, 200);
                  $("#length").text(results.length);
                  $("#namesList").html(showNames.join("<br>"));
                    $('html, body').animate({
                        scrollTop: $('#namesList').offset().top
                    }, 1000);              
              });
            });

            $("#btnSearch").on("click", function () {
                var search = $("#search").val().trim();
                var results = arrayNames.filter(name => name.toLowerCase().startsWith(search.toLowerCase()));
                $("#length").text(results.length);
                $("#namesList").html(results.join("<br>"));
                $('html, body').animate({
                    scrollTop: $('#namesList').offset().top
                }, 1000);

                if (!search) {
                  $("#namesList").html("");
                  $("#length").text(0);                    
                }
            });

            $("#shortNames").click(function () {
                var results = arrayNames.filter(name => name.length < 5);
                var showNames = results.slice(0, 200);
                $("#namesList").html(showNames.join("<br>"));
                $("#length").text(results.length);
                $('html, body').animate({
                    scrollTop: $('#namesList').offset().top
                }, 1000);              
            })

            $("#middleNames").click(function () {
                var results = arrayNames.filter(name => name.length < 8 && name.length > 5);
                var showNames = results.slice(0, 200);
                $("#namesList").html(showNames.join("<br>"));
                $("#length").text(results.length);
                $('html, body').animate({
                    scrollTop: $('#namesList').offset().top
                }, 1000);
            });

            $("#longNames").click(function () {
                var results = arrayNames.filter(name => name.length < 12 && name.length > 8);
                var showNames = results.slice(0, 200);
                $("#namesList").html(showNames.join("<br>"));
                $("#length").text(results.length);
                $('html, body').animate({
                    scrollTop: $('#namesList').offset().top
                }, 1000);
            });

            $("#randomNames").click(function () {
                let randomNames = arrayNames.sort(() => .5 - Math.random()).slice(0, 200);
                $("#namesList").html(randomNames.join("<br>"));
                $('html, body').animate({
                    scrollTop: $('#namesList').offset().top
                }, 1000);
            });

            function nameOfDay() {
                var storedDate = localStorage.getItem('storedDate');
                var today = new Date().toISOString().split('T')[0];

                if (storedDate !== today) {
                    var name = arrayNames[Math.floor(Math.random() * arrayNames.length)];
                    localStorage.setItem('dayName', name);
                    localStorage.setItem('storedDate', today);
                }

                var dayName = localStorage.getItem('dayName');
                $("#dayName").text(dayName);
            }

            nameOfDay();

            $("#random").click(function (event) {
                event.preventDefault();
                var randomName = arrayNames[Math.floor(Math.random() * arrayNames.length)];
                $("#randomName").text(randomName);
                $("#randomName").toggleClass("scale-in");
            });

            $("#btn").click(function () {
                var select = $("#select").val();
                var search = $("#search-input").val().trim();

                if (!search) {
                    alert("Por favor, ingrese un término de búsqueda.");
                    return;
                }

                let results = [];

                if (select === "firstLetter") {
                    results = arrayNames.filter(name => name.toUpperCase().startsWith(search.toUpperCase()));
                } else if (select === "lastLetter") {
                    results = arrayNames.filter(name => name.toLowerCase().endsWith(search.toLowerCase()));
                } else if (select === "filterLength") {
                    let searchNumber = parseInt(search);
                    results = arrayNames.filter(name => name.length === searchNumber);
                } else if (select === "filterIncludes") {
                    results = arrayNames.filter(name => name.includes(search));
                } else if (select === "exactName") {
                    results = arrayNames.filter(name => name === search);
                }

                $("#length").text(results.length);
                var showNames = results.slice(0, 200);
                $("#namesList").html(showNames.join("<br>"));

                $('#selectOrder').on('change', function () {
                    var selectValue = $(this).val();

                    if (selectValue === "1") {
                        var showNames = results.slice(0, 200);
                        showNames.sort((a, b) => a.length - b.length);
                        $("#namesList").html(showNames.join("<br>"));
                    }
                    if (selectValue === "2") {
                        var showNames = results.slice(0, 200);
                        showNames.sort((a, b) => b.length - a.length);
                        $("#namesList").html(showNames.join("<br>"));                       
                    }
                    if (selectValue === "3") {
                        var showNames = results.slice(0, 200);
                        var showNames = showNames.reverse();
                        $("#namesList").html(showNames.join("<br>"));                    
                    }
                    if (selectValue === "4") {
                        var showNames = results.slice(0, 200);

                        for (let i = showNames.length - 1; i > 0; i--) {
                            let j = Math.floor(Math.random() * (i + 1));
                            let k = showNames[i];
                            showNames[i] = showNames[j];
                            showNames[j] = k;
                        }

                        $("#namesList").html(showNames.join("<br>"));                        
                    }
                });

                $("#selectSearch").on("change", function () {
                    var selectValue = $(this).val();

                    if (selectValue === "1") {
                      showNames.sort((a, b) => a.length - b.length);
                      $("#namesList").html(showNames[0]);                        
                    }
                    if (selectValue === "2") {
                      showNames.sort((a, b) => b.length - a.length);
                      $("#namesList").html(showNames[0]);                        
                    }
                });

                $("#show").click(function () {
                    var numberInput = $("#number-input").val();
                    var showNames = results.slice(0, numberInput);
                    $("#namesList").html(showNames.join("<br>"));
                });
            });
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar el archivo de nombres:", error);
        }
    });
});
