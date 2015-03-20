var e = $.Event('setArcadeMode');
$(document).trigger(e);

var e2 = $.Event('setPlaygroundMode');
$(document).trigger(e2);

var e3 = $.Event('setLevelSelectMode');
$(document).trigger(e3);


var testExpressions = ["Result :=  Select[A >= A1 && B != B1](Foo X Rename[B/B1](Rename[A/A1](Foo)))",
                       //selects max of A
    "Result: = Project[A](Foo) - Project[A]( Select[A < A1](Project[A, A1](Foo X(Rename[A / A1](Rename[B / B1](Foo))))))",
                       "Result := "
                      ];