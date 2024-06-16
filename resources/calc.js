$(document).ready(() => {
	const EVENT0 = {
		repository : {
			data: 0,
			setData: (value) => {EVENT0.repository.data = value;},
			getData: () => {return EVENT0.repository.data;}
		},
		add : (input) => {
			var num = $("#value").val();
			EVENT0.repository.setData( (num == 0)?input:(num + input) );
			$("#value").val(EVENT0.repository.getData());
		},
		mark : (input) => {
			$("#mark").val(input);
			EVENT0.history("입력받은 연산 기호 : " + input);
		},
		reset : () => {
			$("#value").val(0);
			$("#mark").val("");
			EVENT0.history("", true);
		},
		run : () => {
			$("form").submit();
		},
		history: (value, type) => {
			if(type) {
				$("#history").empty();
			} else {
				if($("#value").val() != 0) {
					EVENT0.draw("입력받은 전값 : " + EVENT0.repository.getData());
					$("#value").val(0);
				}
				EVENT0.draw(value);
			}
		},
		draw: (value) => {
			if($("#history li").length > 10)
			$("#history li").eq(9).remove();
			var html = `<li class="list-group-item">${value}</li>`;
			$("#history").prepend(html);
		}
	};
	const EVENT1 = (e) => {
		const input = $(e.target).text();
		switch (input) {
			case '1': case '2': case '3': case '4': case '5':
			case '6': case '7': case '8': case '9': case '0':
				EVENT0.add(input);
				break;
			case '+': case '-': case '*': case '/':
				EVENT0.mark(input);
				break;
			case 'C':
				EVENT0.reset();
				break;
			case '=':
				EVENT0.run();
				break;
			default:
				console.log("오류");
		};
	}
	const EVENT2 = () => {
		var num = $("#value").val();
		EVENT0.repository.setData( num.substring(0, num.length - 1) );
		$("#value").val(EVENT0.repository.getData());
	}
	$("tbody tr td").on("click", EVENT1);
	$("#del").on("click", EVENT2);
});