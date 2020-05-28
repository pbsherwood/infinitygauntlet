function InfinityGauntlet(gauntlet_selector, element_dict) 
{
	var jsFileLocation = document.querySelector('script[src*=infinity\\.js]').src;
	var main_path = jsFileLocation.replace('infinity.js', '');
	
	var gaunt_ele = document.createElement("div");
	gaunt_ele.id = 'infinity_gauntlet';
	gaunt_ele.title = 'Infinity Gauntlet';
	var gaunt_img_ele = document.createElement("img");
	gaunt_img_ele.src = main_path + 'img/gauntlet.png';
	
	gaunt_ele.appendChild(gaunt_img_ele);
	document.querySelector(gauntlet_selector).appendChild(gaunt_ele);
	
    var gauntlet_sound = new Audio(main_path + 'snap.mp3');
    var stone_sound = new Audio(main_path + 'obtain.mp3');

	var corners = [
        { name: 'infinity_stone_top_left', valid_elements: [] },
        { name: 'infinity_stone_top_right', valid_elements: [] },
        { name: 'infinity_stone_bottom_right', valid_elements: [] },
        { name: 'infinity_stone_bottom_left', valid_elements: [] }
    ];
	
	element_collection_query_selectors = [];
	for (let [key, value] of Object.entries(element_dict))
	{
		element_collection_query_selectors.push(key);
		
		tmp_key = key.replace('.', '');
		
		if (value.includes("top_left"))
		{
			corners[0].valid_elements.push(tmp_key);
		}
		else if (value.includes("top_right"))
		{
			corners[1].valid_elements.push(tmp_key);
		}
		else if (value.includes("bottom_right"))
		{
			corners[2].valid_elements.push(tmp_key);
		}
		else if (value.includes("bottom_left"))
		{
			corners[3].valid_elements.push(tmp_key);
		}
	}
	
    var element_collection = document.querySelectorAll(element_collection_query_selectors.join(", "));

    var infinityGauntlet = {

        stones: {
            soulStone: { id: 'soulStone', equipped: false, name: 'Soul Stone', img: 'img/soul_stone_vector_by_saiol1000-dbrt3kt.png', info: 'Limitless manipulation of souls both alive and dead also has shown to be able to evolve or devolve a beings physical self as well as their mental capacities.'},	
            realityStone: { id: 'realityStone', equipped: false, name: 'Reality Stone', img: 'img/reality_stone_by_saiol1000-dbrx6jl.png', info: 'Locally or universally alters the natural laws of the universe to the wielders will.'},
            mindStone: { id: 'mindStone', equipped: false, name: 'Mind Stone', img: 'img/mind_stone_by_saiol1000-dbrx6jc.png', info: 'Taps the user into the universal consciousness, allowing for unlimited manipulation of psionic powers including telepathy and telekinesis.'},
            spaceStone: { id: 'spaceStone', equipped: false, name: 'Space Stone', img: 'img/space_stone_by_saiol1000-dbrx6jr.png', info: 'Limitless manipulation of space, allowing for teleportation, dimensional manipulation, creation of wormholes, etc.'},
            timeStone: { id: 'timeStone', equipped: false, name: 'Time Stone', img: 'img/time_stone_by_saiol1000-dbrx6jz.png', info: 'Total control over all aspects of time including time travel, stopping time, slowing down or speed up flow of time and to accelerate or slow down aging.'},
            powerStone: { id: 'powerStone', equipped: false, name: 'Power Stone', img: 'img/power_stone_by_saiol1000-dbrx6jw.png', info: 'Controls all of the power in the universe. It can be used to augment or inhibit any force.'}
        },
        snapped: false,
        dusted: [],

        snapFinger(e) {
            if( this.snapped == false && this.stones.powerStone.equipped && this.stones.spaceStone.equipped && this.stones.realityStone.equipped && this.stones.mindStone.equipped && this.stones.soulStone.equipped && this.stones.timeStone.equipped ) 
            {
                sendMessage('info', 'Destroyed half of the population in the universe!', '');
                gauntlet_sound.play();

				var all_page_elements = document.querySelectorAll('div:not(#infinity_gauntlet)');
                setTimeout(function() {
                    remove_fifty_percent(all_page_elements);
                }, 3200);

                this.snapped = true;
                return 'Destroyed half of the population in the universe!'
            }
            else if( this.snapped && this.stones.powerStone.equipped && this.stones.spaceStone.equipped && this.stones.realityStone.equipped && this.stones.mindStone.equipped && this.stones.soulStone.equipped && this.stones.timeStone.equipped ) 
            {
                sendMessage('info', 'Stop, Stop... They\'re Already Dead', '');
                return 'Stop, Stop... They\'re Already Dead'
            } 
            else 
            {
                sendMessage('info', 'You need all the stones to use the gauntlet!', '');
                e.preventDefault();
                return 'You need all the stones to perform this action!'
            }
        }
    }

    var locations = [];

    function extractColumn(arr, column) 
    {
        function reduction(previousValue, currentValue) 
        {
            previousValue.push(currentValue[column]);
            return previousValue;
        }

        return arr.reduce(reduction, []);
    }

	function sendMessage(type, message)
	{
		console.log(message);
		/*alert(message);*/
	}
	
    function remove_fifty_percent(all_page_elements)
    {
        var half_elements_count = Math.round(all_page_elements.length / 2);
        if (infinityGauntlet.dusted.length < half_elements_count)
        {
            var rand = Math.round(Math.random() * 50);
            setTimeout(function() {
				remove_random_single_element(all_page_elements);
				remove_fifty_percent(all_page_elements);  
            }, rand);
        }
    }

    function remove_random_single_element(all_page_elements)
    {
        var random_int_in_range = getRandomInt(0, all_page_elements.length);
        while(true)
        {
            if (!infinityGauntlet.dusted.includes(random_int_in_range))
            {
                infinityGauntlet.dusted.push(random_int_in_range);

                try {

                    var particles = new Particles(all_page_elements[random_int_in_range], {
                                                    color: 'black',
                                                    particlesAmountCoefficient: 1,
                                                    complete: function() {
                                                        all_page_elements[random_int_in_range].parentNode.removeChild(all_page_elements[random_int_in_range]);
                                                    }
                                                });
                    particles.disintegrate();

                } catch (e) {}
                break;
            }
            else
            {
                random_int_in_range = getRandomInt(0, all_page_elements.length);
            }
        }
    }

    function getRandomInt(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function pick_random_corner(classes)
    {
        var num = Math.floor(Math.random() * (corners.length));
        var corner = corners[num];
        var found_allowed_corners = corner.valid_elements.filter(value => classes.contains(value) );
        return found_allowed_corners.length > 0 ? corner.name : pick_random_corner(classes);
    }

    function place_stone(stone)
    {
        var all_possible_element_selectors = "." + ([].concat.apply([], extractColumn(corners, 'valid_elements') ).join(", ."));
        var all_possible_element_corners = document.querySelectorAll(all_possible_element_selectors);

        if (all_possible_element_corners.length >= 6)
        {
            var random_num = Math.floor(Math.random() * (element_collection.length));
            var random_element = element_collection[random_num];

            var random_corner = pick_random_corner(random_element.classList);

            var element_hash = random_element.parentNode.id + '--' + random_element.classList[0] + '--' + random_corner;

            if (locations.includes(element_hash))
            {
                place_stone(stone);
            }
            else
            {
                locations.push(element_hash);
                random_element.innerHTML += '<div id="' + stone.id + '" class="infinity_stone ' + random_corner + '" data-infinity-text="' + stone.info + '"><img src="' + main_path + stone.img + '" /></div>';
            }
        }
    }

    function determine_gauntlet_background()
    {
        var background_strings = [];
        Object.keys(infinityGauntlet.stones).forEach(function(key) {
            if (infinityGauntlet.stones[key].equipped)
            {
                background_strings.push("url(" + main_path + "img/" + key + ".png)");
            }
        });
        document.getElementById("infinity_gauntlet").style.background = background_strings.join(", ");
    }

    Object.keys(infinityGauntlet.stones).forEach(function(key) {
        place_stone(infinityGauntlet.stones[key]);
    });
	
	var all_stones = document.querySelectorAll('.infinity_stone');
		
	for (let i = 0; i < all_stones.length; i++) {
		all_stones[i].addEventListener("click", (event) => {
			
			var element = event.currentTarget;
			
			sendMessage('persistent', element.dataset.infinityText, '');
			stone_sound.play();

			element.style.top = element.getBoundingClientRect().y;
			element.style.left = element.getBoundingClientRect().x;
			element.style.position = "fixed";

			element.classList.remove('infinity_stone_top_left');
			element.classList.remove('infinity_stone_top_right');
			element.classList.remove('infinity_stone_bottom_left');
			element.classList.remove('infinity_stone_bottom_right');

			Velocity(element,
			{ 
				top: 15, 
				left: document.querySelector("#infinity_gauntlet").getBoundingClientRect().left + 15 + window.scrollX
			}, 
			{ 
				duration: 4000,
				complete: function() { 
					infinityGauntlet.stones[element.id].equipped = true;
					element.style.display = "none";
					determine_gauntlet_background();
				}
			});
		});
	}

	document.querySelector('#infinity_gauntlet').addEventListener("click", (e) => {
        infinityGauntlet.snapFinger(e);
    });

};