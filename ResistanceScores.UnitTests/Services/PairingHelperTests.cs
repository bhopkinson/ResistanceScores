using AutoFixture;
using ResistanceScores.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace ResistanceScores.UnitTests.Services
{
    public class PairingHelperTests
    {
        private readonly Fixture _fixture;

        public PairingHelperTests()
        {
            _fixture = new Fixture();
        }

        [Fact]
        public void GetAll2ItemCombinations_ReturnsBlank_WithBlankInput()
        {
            // Arrange
            var blankArray = _fixture.CreateMany<int>(0);

            // Act
            var result = PairingHelper.GetAll2ItemCombinations(blankArray);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public void GetAll2ItemCombinations_ReturnsBlank_WithSingleInput()
        {
            // Arrange
            var singleItemArray = _fixture.CreateMany<int>(1);

            // Act
            var result = PairingHelper.GetAll2ItemCombinations(singleItemArray);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public void GetAll2ItemCombinations_ReturnsSingleItem_With2ItemInput()
        {
            // Arrange
            var doubleItemArray = _fixture.CreateMany<int>(2);

            // Act
            var result = PairingHelper.GetAll2ItemCombinations(doubleItemArray);

            // Assert
            Assert.Single(result);
        }

        [Fact]
        public void GetAll2ItemCombinations_ReturnsCorrectNumberOfItems()
        {
            // Arrange
            // The nCr equation used to calculate the number of combinations
            // where n = the population size and r = the subset size.
            int nCr(int n, int r) => Factorial(n) / (Factorial(r) * Factorial(n - r));

            var inputArraySize = CreateFactorialisableInt();
            var inputArray = _fixture.CreateMany<int>(inputArraySize);
            var expectedOutputSize = nCr(inputArraySize, 2);

            // Act
            var result = PairingHelper.GetAll2ItemCombinations(inputArray);

            // Assert
            Assert.Equal(expectedOutputSize, result.Count);
        }

        [Fact]
        public void GetAll2ItemCombinations_2ItemArray_ReturnsExpectedCombinations()
        {
            // Arrange
            var inputArray = new int[] { 1, 2 };
            var expectedOutputs = new List<int[]> { new int[] { 1, 2 } };

            // Act
            var result = PairingHelper.GetAll2ItemCombinations(inputArray);

            // Assert
            Assert.Equal(expectedOutputs, result);
        }

        [Fact]
        public void GetAll2ItemCombinations_3ItemArray_ReturnsExpectedCombinations()
        {
            // Arrange
            var inputArray = new int[] { 1, 2, 3 };
            var expectedOutputs = new List<int[]> {
                new int[] { 1, 2 },
                new int[] { 1, 3 },
                new int[] { 2, 3 }
            };

            // Act
            var result = PairingHelper.GetAll2ItemCombinations(inputArray);

            // Assert
            Assert.Equal(expectedOutputs, result);
        }

        [Fact]
        public void GetAll2ItemCombinations_4ItemArray_ReturnsExpectedCombinations()
        {
            // Arrange
            var inputArray = new int[] { 1, 2, 3, 4 };
            var expectedOutputs = new List<int[]> {
                new int[] { 1, 2 },
                new int[] { 1, 3 },
                new int[] { 1, 4 },
                new int[] { 2, 3 },
                new int[] { 2, 4 },
                new int[] { 3, 4 }
            };

            // Act
            var result = PairingHelper.GetAll2ItemCombinations(inputArray);

            // Assert
            Assert.Equal(expectedOutputs, result);
        }

        [Fact]
        public void GetAll2ItemCombinations_5ItemArray_ReturnsExpectedCombinations()
        {
            // Arrange
            var inputArray = new int[] { 1, 2, 3, 4, 5 };
            var expectedOutputs = new List<int[]> {
                new int[] { 1, 2 },
                new int[] { 1, 3 },
                new int[] { 1, 4 },
                new int[] { 1, 5 },
                new int[] { 2, 3 },
                new int[] { 2, 4 },
                new int[] { 2, 5 },
                new int[] { 3, 4 },
                new int[] { 3, 5 },
                new int[] { 4, 5 },
            };

            // Act
            var result = PairingHelper.GetAll2ItemCombinations(inputArray);

            // Assert
            Assert.Equal(expectedOutputs, result);
        }

        private int Factorial(int inputInt)
        {
            var outputInt = 1;

            for (int i = inputInt; i > 0; i--)
            {
                outputInt *= i;
            }
            return outputInt;
        }

        private int CreateFactorialisableInt()
        {
            // 12! = 479,001,600 < 2,147,483,647
            // 13! = 6,227,020,800 > 2,147,483,647
            var maxFactorialisableInt = 12;

            var generatedInt = _fixture.Create<int>();

            while (generatedInt > maxFactorialisableInt)
            {
                generatedInt = _fixture.Create<int>();
            }

            return generatedInt;
        }
    }
}
